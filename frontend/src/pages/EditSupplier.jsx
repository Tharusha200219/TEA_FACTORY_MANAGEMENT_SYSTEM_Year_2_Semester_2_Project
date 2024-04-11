import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BackButtonSupplierHome from '../components/backbtnSupplierHome';

const EditSupplier = () => {
    const [supplierid, setSupplierID] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/suppliers/${id}`)
            .then((response) => {
                setSupplierID(response.data.supplierid);
                setName(response.data.name);
                setAddress(response.data.address);
                setContact(response.data.contact);
                setEmail(response.data.email);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('There was an error. Please check the console.');
                console.log(error);
            });
    }, [id]);

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

        if (!supplierid.trim()) {
            errors.supplierid = 'Supplier ID is required';
        }
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
        console.log(errors);
    };

    const handleEditSupplier = () => {
        validate();
        const isValid = Object.values(errors).every((error) => error === '');

        if (isValid) {

            const data = {
                //supplierid,
                name,
                address,
                contact,
                email,
            };
            setLoading(true);
            axios.put(`http://localhost:5555/suppliers/${id}`, data)
                .then(() => {
                    setLoading(false);
                    navigate('/SupplierHome');
                })
                .catch((error) => {
                    setLoading(false);
                    alert('An error occurred');
                    console.error(error);
                });
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <NavigationBar />
            <div class='m-5'>
                <BackButtonSupplierHome/>
            </div>
    
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto mt-8'>
            <h1 className='text-3xl font-bold text-center my-3'>Update Supplier</h1>
                <div className='px-4 my-2'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier ID</label>
                    <input
                        type="text"
                        value={supplierid}
                        onChange={(e) => setSupplierID(e.target.value)}
                        className='input-field bg-slate-200'
                        disabled
                    />
                </div>
                <div className='px-4 my-2'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            handleInputChange(e, validateName);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className='px-4 my-2'>
                    <label className='text-xl mr-4 text-gray-500'>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            handleInputChange(e, validateAddress);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.address && <p className="text-red-500">{errors.address}</p>}
                </div>
                <div className='px-4 my-2'>
                    <label className='text-xl mr-4 text-gray-500'>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={contact}
                        onChange={(e) => {
                            setContact(e.target.value);
                            handleInputChange(e, validateContact);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.contact && <p className="text-red-500">{errors.contact}</p>}
                </div>
                <div className='px-4 my-2'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            handleInputChange(e, validateEmail);
                        }}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <button className='p-2 bg-sky-300 mx-40 my-4 rounded' onClick={handleEditSupplier}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditSupplier;
