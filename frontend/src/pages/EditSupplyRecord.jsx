import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BackButtonSupplyRecords from '../components/backbtnSupplyRecordTable';
import Footer from '../components/Footer';

const EditSupplyRecord = () => {
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/supplyrecords/${id}`)
            .then((response) => {
                setSelectedSupplier(response.data.supplier);
                setDate(response.data.date.substring(0, 10));
                setQuantity(response.data.quantity);
                setUnitPrice(response.data.unitPrice);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });

    }, [id, selectedSupplier]);

    const validateDate = (value) => {
        if (!value) {
            return 'Date is required';
        }
        return '';
    };

    const validateQuantity = (value) => {
        console.log(value, 'validate quantity');
        if (!value) {
            return 'Quantity is required';
        } else if (parseInt(value) <= 0) {
            return 'Quantity must be greater than 0';
        }
        return '';
    };

    const validateUnitPrice = (value) => {
        if (!value) {
            return 'Unit price is required';
        } else if (parseFloat(value) <= 0) {
            return 'Unit price must be greater than 0';
        }
        return '';
    };

    const handleInputChange = (e, validator) => {
        const { name, value } = e.target;
        const error = validator(value);
        console.log(error);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const validate = () => {
        const errors = {};
    
        if (!selectedSupplier.trim()) {
            errors.selectedSupplier = 'Supplier is required';
        }
        if (!date) {
            errors.date = 'Date is required';
        }
        if (!quantity) {
            errors.quantity = 'Quantity is required';
        }
        if (!unitPrice) {
            errors.unitPrice = 'Unit price is required';
        }
    
        setErrors((prevErrors) => ({ 
            ...prevErrors,
            ...errors 
        }));
    };

    const handleEditSupplyRecord = () => {

        validate();
        const isValid = Object.values(errors).every((error) => error === '');
        console.log(isValid);
        if (isValid) {
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
                console.log(error);
            });
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <NavigationBar />
            <div class='m-5'>
                <BackButtonSupplyRecords/>
            </div>
            
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mt-8'>
            <h1 className='text-3xl font-bold text-center my-4'>Update Record</h1>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier</label>
                    <input
                        type="text"
                        name="selectedSupplier"
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
                        name="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            handleInputChange(e, validateDate);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            handleInputChange(e, validateQuantity);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Unit Price</label>
                    <input
                        type="number"
                        name="unitPrice"
                        value={unitPrice}
                        onChange={(e) => {
                            setUnitPrice(e.target.value);
                            handleInputChange(e, validateUnitPrice);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.unitPrice && <p className="text-red-500">{errors.unitPrice}</p>}
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplyRecord}>
                    Save
                </button>
            </div>
            <br></br>
            <Footer />
        </div>
    );
};

export default EditSupplyRecord;
