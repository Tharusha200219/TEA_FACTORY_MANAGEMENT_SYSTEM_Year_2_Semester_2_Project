import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const PaymentSupplierCreate = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierId, setSupplierId] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:5555/suppliers');
            setSuppliers(response.data);
            console.log("Suppliers", suppliers);
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    const handleSavePayment = () => {
        if (endDate && new Date(endDate) < new Date(startDate)) {
            alert('End date cannot be before start date');
            return;
        }
        const data = {
            supplierId,
            amount,
            method,
            startDate,
            endDate,
        };
        console.log("Data to be sent: ", data);
        setLoading(true);
        axios.post('http://localhost:5555/payments/add', data)
            .then(() => {
                setLoading(false);
                navigate('/PaymentsHome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Add New Payment for Supplier</h1>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier</label>
                    <select
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {`${supplier.name}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='p-4'>
    <label className='text-xl mr-4 text-gray-500'>Order Number</label>
    <input
        type="text"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'
    />
</div>


                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value="">Select Method</option>
                        <option value="Visa">Visa</option>
                        <option value="Master">Master</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Start Date</label>
                    <input
                        type="date" min={new Date().toJSON().slice(0, 10)}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)} 
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>End Date</label>
                    <input
                        type="date"
                        value={endDate} min={new Date().toJSON().slice(0, 10)}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSavePayment}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default PaymentSupplierCreate;
