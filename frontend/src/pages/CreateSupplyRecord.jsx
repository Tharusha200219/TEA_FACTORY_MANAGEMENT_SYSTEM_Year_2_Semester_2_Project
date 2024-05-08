import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BackButtonSupplyRecords from '../components/backbtnSupplyRecordTable';
import Footer from '../components/Footer';

const CreateSupplyRecord = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/suppliers')
            .then((response) => {
                setSuppliers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            });
    }, []);
    
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    };

     useEffect(() => {
        setDate(getCurrentDate());
    }, []);

    const validateSelectedSupplier = (value) => {
        if (!value) {
            return 'Supplier is required';
        }
        return '';
    };

    const validateQuantity = (value) => {
        const isValid = /^\d*\.?\d+$/.test(value);
        if (!value) {
            return 'Quantity is required';
        } else if (!isValid) {
            return 'Quantity must be a number';
        } else if (parseFloat(value) <= 0) {
            return 'Quantity must be greater than 0';
        }
        return '';
    };
    
    const validateUnitPrice = (value) => {
        const isValid = /^\d*\.?\d+$/.test(value);
        if (!value) {
            return 'Unit price is required';
        } else if (!isValid) {
            return 'Unit price must be a number';
        } else if (parseFloat(value) <= 0) {
            return 'Unit price must be greater than 0';
        }
        return '';
    };

    const handleInputChange = (e, validator) => {
        const { name, value } = e.target;
        const error = validator(value);
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
    
    const handleSaveSupplyRecord = () => {
        validate();
        const isValid = Object.values(errors).every((error) => error === '');

        if (isValid) {
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
                    setLoading(false);
                    console.log(error);
                });
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen' style={{ backgroundImage: "url('/images/create.png')" }}>
            <NavigationBar />
            <div className='m-4'>
                <BackButtonSupplyRecords/>
            </div>
        
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center justify-center border border-sky-400 bg-white rounded-lg shadow-md p-8 mx-auto mt-8 max-w-lg'>
                <h1 className='text-3xl font-bold mb-8 mt-2'>Add New Record</h1>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Supplier</label>
                    <select
                        name="selectedSupplier"
                        value={selectedSupplier}
                        onChange={(e) => {
                            setSelectedSupplier(e.target.value);
                            handleInputChange(e, validateSelectedSupplier);
                        }}
                        className='input-field input-field-custom mt-1 w-full'
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.supplierid} value={supplier.supplierid + '/' + supplier.name}>
                                {`${supplier.supplierid} - ${supplier.name}`}
                            </option>
                        ))}
                    </select>
                    {errors.selectedSupplier && <p className="text-red-500">{errors.selectedSupplier}</p>}
                </div>
        
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        readOnly
                        className='input-field mt-1 w-full'
                        style={{ backgroundColor: '#f2f2f2' }}
                    />
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>
        
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Quantity (kg)</label>
                    <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            handleInputChange(e, validateQuantity);
                        }}
                        className='input-field mt-1 w-full'
                    />
                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                </div>
        
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Unit Price</label>
                    <input
                        type="text"
                        name="unitPrice"
                        value={unitPrice}
                        onChange={(e) => {
                            setUnitPrice(e.target.value);
                            handleInputChange(e, validateUnitPrice);
                        }}
                        className='input-field mt-1 w-full'
                    />
                    {errors.unitPrice && <p className="text-red-500">{errors.unitPrice}</p>}
                </div>
        
                <button 
                 className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4' 
                 onClick={handleSaveSupplyRecord}>
                    Save
                </button>
            </div>
            <br></br>
            <Footer />
        </div>
    );
};

export default CreateSupplyRecord;
