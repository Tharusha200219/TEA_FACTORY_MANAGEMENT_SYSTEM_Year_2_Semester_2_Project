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
    
    const validateDate = (value) => {
        if (!value) {
            return 'Date is required';
        }
        return '';
    };

    const validateQuantity = (value) => {
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
                <h1 className='text-3xl font-bold mb-4'>Add New Record</h1>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600'>Supplier</label>
                    <select
                        name="selectedSupplier"
                        value={selectedSupplier}
                        onChange={(e) => {
                            setSelectedSupplier(e.target.value);
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
                    <label className='text-gray-600'>Date</label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            handleInputChange(e, validateDate);
                        }}
                        className='input-field mt-1 w-full'
                    />
                    {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>
        
                <div className='mb-4 w-full'>
                    <label className='text-gray-600'>Quantity</label>
                    <input
                        type="number"
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
                    <label className='text-gray-600'>Unit Price</label>
                    <input
                        type="number"
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
                 onClick={handleSaveSupplyRecord}
                 //  disabled={!(unitPrice && date && selectedSupplier && quantity)}
                 >
                 Save
                </button>
            </div>
            <br></br>
            <Footer />
        </div>
    );
};

export default CreateSupplyRecord;
