import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditSupplier = () => {
    const [supplierid, setSupplierID] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
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

    const handleEditSupplier = () => {
        const data = {
            supplierid,
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
                alert('An error occurred');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            {/* <BackButton /> */}
            <h1 className='text-3xl my-4'>Update Supplier</h1>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Supplier ID</label>
                    <input
                        type="text"
                        value={supplierid}
                        onChange={(e) => setSupplierID(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                        style={{ backgroundColor: '#f2f2f2' }}
                        disabled // Disable input field
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Contact No</label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleEditSupplier}>
                    Save
                </button>

            </div>
        </div>
    );
};

export default EditSupplier;
