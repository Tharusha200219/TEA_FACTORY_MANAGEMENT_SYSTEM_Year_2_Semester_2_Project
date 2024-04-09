import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditSupplyRecord = () => {
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [supplierData, setSupplierData] = useState(null); 
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/supplyrecords/${id}`)
            .then((response) => {
                setSelectedSupplier(response.data.supplier);
                setDate(response.data.date);
                setQuantity(response.data.quantity);
                setUnitPrice(response.data.unitPrice);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('There was an error. Please check the console.');
                console.log(error);
            });

        // Fetch supplier data using the selectedSupplier ID
        axios.get(`http://localhost:5555/suppliers/${selectedSupplier}`)
            .then((response) => {
                setSupplierData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching supplier data:', error);
            });
    }, [id, selectedSupplier]);

    const handleEditSupplyRecord = () => {
        const data = {
            supplier: selectedSupplier,
            date,
            quantity,
            unitPrice,
        };
        setLoading(true);
        axios.put(`http://localhost:5555/supplyrecords/${id}`, data)
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
        <div className='p-4'>
            {/* <BackButton /> */}
            <h1 className='text-3xl my-4'>Update Supply Record</h1>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier</label>
                    <input
                        type="text"
                        value={selectedSupplier}
                        readOnly // read only
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        style={{ backgroundColor: '#f2f2f2' }}
                    />
                </div>

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

                <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplyRecord}>
                    Save
                </button>

            </div>
        </div>
    );
};

export default EditSupplyRecord;
