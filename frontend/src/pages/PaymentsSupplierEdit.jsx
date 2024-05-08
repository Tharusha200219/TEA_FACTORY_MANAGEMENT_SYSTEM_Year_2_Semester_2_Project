import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaymentSupplierEdit = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/payments/${id}`)
            .then((response) => {
                console.log('Fetched payment:', response.data);
                setPayment(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching payment:', error);
                setLoading(false);
            });
    }, [id]);

    const handleSavePayment = () => {
        if (endDate && new Date(endDate) < new Date(startDate)) {
            alert('End date cannot be before start date');
            return;
        }
        setLoading(true);
        axios.put(`http://localhost:5555/payments/update/${id}`, payment)
            .then(() => {
                setLoading(false);
                navigate('/PaymentsHome');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred while saving.');
                console.error('Error saving payment:', error);
            });
    };
    
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Edit Payment</h1>

            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier ID</label>
                    <input
                        type="text"
                        value={payment.supplierId || ''}
                        disabled
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Amount</label>
                    <input
                        type="number"
                        value={payment.amount || ''}
                        onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Method</label>
                    <select
                        value={payment.method || ''}
                        onChange={(e) => setPayment({ ...payment, method: e.target.value })}
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
                        type="date"
                        value={payment.startDate || ''}
                        onChange={(e) => setPayment({ ...payment, startDate: e.target.value })}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>End Date</label>
                    <input
                        type="date"
                        value={payment.endDate || ''}
                        onChange={(e) => setPayment({ ...payment, endDate: e.target.value })}
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

export default PaymentSupplierEdit;
