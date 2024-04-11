import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BackButtonSupplyRecords from '../components/backbtnSupplyRecordTable';

const CreateSupplyRecord = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/suppliers')
            .then((response) => {
                setSuppliers(response.data);
                console.log(suppliers);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            });
    }, []);

    const handleSaveSupplyRecord = () => {
        const data = {
            supplier: selectedSupplier,
            date,
            quantity,
            unitPrice,
        };
        setLoading(true);
        axios.post('http://localhost:5555/supplyrecords', data)
            .then(() => {
                setLoading(false);
                navigate('/SupplyRecordTable'); 
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
            });
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <NavigationBar />
            <div class='m-2'>
                <BackButtonSupplyRecords/>
            </div>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mt-8'>
            <h1 className='text-3xl font-bold text-center my-4'>Add New Record</h1>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier</label>
                    <select
                        value={selectedSupplier}
                        onChange={(e) => setSelectedSupplier(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        {/* <option value="">Select Supplier</option> */}
                        {suppliers.map((supplier) => (
                            <option key={supplier.supplierid} value={supplier.supplierid + '/' + supplier.name}>
                                {`${supplier.supplierid} - ${supplier.name}`}
                            </option>
                        ))}
                    </select>
                </div>
{/* To do - fix date format */}
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Unit Price</label>
                    <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveSupplyRecord}>
                    Save
                </button>

            </div>
        </div>
    );
};

export default CreateSupplyRecord;

