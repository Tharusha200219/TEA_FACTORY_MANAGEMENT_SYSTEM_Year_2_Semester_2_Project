import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BackButtonSupplierHome from '../components/backbtnSupplierHome';
import Footer from '../components/Footer';

const CreateSupplier = () => {
    const [supplierid, setSupplierID] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateName = (value) => {
        const minLength = 5; 
        const maxlength = 20; 
    
        if (!value.trim()) {
            return 'Name is required';
        } else if (value.trim().length < minLength || value.trim().length > maxlength) {
            return `Name must be between ${minLength} and ${maxlength} characters`;
        }
        return '';
    };
    
    const validateAddress = (value) => {
        const minLength = 15; 
        const maxlength = 50;
    
        if (!value.trim()) {
            return 'Address is required';
        } else if (value.trim().length < minLength || value.trim().length > maxlength) {
            return `Address must be between ${minLength} and ${maxlength} characters`;
        }
        return '';
    };
    
    const validateContact = (value) => {
        if (!value.trim()) {
            return 'Contact number is required';
        } else if (!value.match(/^\d{10}$/)) {
            return 'Contact number must be 10 digits';
        }
        return '';
    };

    const validateEmail = (value) => {
        const emailCheck = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!value.trim()) {
            return 'Email is required';
        } else if (!emailCheck.test(value)) {
            return 'Invalid email format (e.g., example@gmail.com)';
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

        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!address.trim()) {
            errors.address = 'Address is required';
        }
        if (!contact.trim()) {
            errors.contact = 'Contact number is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            ...errors
        }));
    };

    const generateUniqueSupplierID = () => {
        axios.get('http://localhost:5555/suppliers')
            .then((response) => {
                const existingSIDs = response.data.map(item => item.supplierid);
                const availableNumbers = Array.from({ length: 1000 }, (_, index) => index + 1);
                const availableSIDs = availableNumbers.map(num => `SID${num.toString().padStart(4, '0')}`)
                    .filter(id => !existingSIDs.includes(id));

                if (availableSIDs.length > 0) {
                    setSupplierID(availableSIDs[0]);
                } else {
                    alert('All supplier IDs from SID0001 to SID1000 are used.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        generateUniqueSupplierID();
    }, []);

    const handleSaveSupplier = () => {
        validate();
        const isValid = Object.values(errors).every((error) => error === '');

        if (isValid) {
            const data = { 
                supplierid,
                name,
                address, 
                contact,
                email,
            };
            setLoading(true);
            axios.post('http://localhost:5555/suppliers', data)
                .then(() => {
                    setLoading(false);
                    navigate('/SupplierHome');
                })
                .catch(error => {
                    setLoading(false);
                    console.error(error);
                });          
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen' style={{ backgroundImage: "url('/images/create.png')" }}>
            <NavigationBar />
            <div className='m-5'>
                <BackButtonSupplierHome/>
            </div>
            
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col items-center justify-center border border-sky-400 bg-white rounded-lg shadow-md px-8 py-5 mx-auto mt-4 max-w-lg'>
                <h1 className='text-3xl font-bold mb-8 mt-2'>Add New Supplier</h1>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Supplier ID</label>
                    <input
                        type="text"
                        name="supplierid"
                        value={supplierid}
                        readOnly
                        className='input-field bg-gray-200 mt-1'
                        onChange={(e) => {
                            setSupplierID(e.target.value);
                        }}
                    />
                    {errors.supplierid && <p className="text-red-500 mt-1">{errors.supplierid}</p>}
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            handleInputChange(e, validateName);
                        }}
                        className='input-field mt-1'
                    />
                    {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            handleInputChange(e, validateAddress);
                        }}
                        className='input-field mt-1'
                    />
                    {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Contact No</label>
                    <input
                        type="text"
                        name="contact"
                        value={contact}
                        onChange={(e) => {
                            setContact(e.target.value);
                            handleInputChange(e, validateContact);
                        }}
                        className='input-field mt-1'
                    />
                    {errors.contact && <p className="text-red-500 mt-1">{errors.contact}</p>}
                </div>
                <div className='mb-4 w-full'>
                    <label className='text-gray-600 text-xl'>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            handleInputChange(e, validateEmail);
                        }}
                        className='input-field mt-1'
                    />
                    {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                </div>
                <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4'
                  onClick={handleSaveSupplier}>
                    Save
                </button>
            </div>
            <br></br>
            <Footer />
        </div>
    );
};

export default CreateSupplier;
