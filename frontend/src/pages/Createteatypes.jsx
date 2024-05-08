import React, { useState, useEffect } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Createteatypes = () => {
    const [Schedule_no, setSchedule_no] = useState(1);
    const [black_tea, setblack_tea] = useState('');
    const [green_tea, setgreen_tea] = useState('');
    const [oolong_tea, setoolong_tea] = useState('');
    const [white_tea, setwhite_tea] = useState('');
    const [tea_wastage, setTea_wastage] = useState('');
    const [status, setStatus] = useState('pending'); // Added state for status with default value
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5555/teatypes')
            .then((response) => {
                const lastScheduleNo = response.data.data.length + 1;
                setSchedule_no(lastScheduleNo);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSaveteatypes = () => {
        if (!black_tea || !green_tea || !oolong_tea || !white_tea || !tea_wastage) {
            alert('Please fill in all tea types and wastage');
            return;
        }

        const blackTeaValue = parseInt(black_tea);
        const greenTeaValue = parseInt(green_tea);
        const oolongTeaValue = parseInt(oolong_tea);
        const whiteTeaValue = parseInt(white_tea);
        const teaWastageValue = parseInt(tea_wastage);

        if (isNaN(blackTeaValue) || isNaN(greenTeaValue) || isNaN(oolongTeaValue) || isNaN(whiteTeaValue) || isNaN(teaWastageValue)) {
            alert('Please enter valid numbers for tea types and wastage');
            return;
        }

        const total = blackTeaValue + greenTeaValue + oolongTeaValue + whiteTeaValue;
        if (total > 1000) {
            alert('Total tea types cannot exceed 1000');
            return;
        }

        const data = {
            Schedule_no,
            black_tea: blackTeaValue,
            green_tea: greenTeaValue,
            oolong_tea: oolongTeaValue,
            white_tea: whiteTeaValue,
            tea_wastage: teaWastageValue,
            status, // Include status in the data object
        };
        setLoading(true);
        axios.post('http://localhost:5555/teatypes', data)
            .then(() => {
                setLoading(false);
                navigate('/Teatypehome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false);
            });
    };

    // Function to handle input change with validation for special characters and spaces
    const handleInputChange = (setter) => (e) => {
        const inputValue = e.target.value;
        // Regular expression to check for special characters and spaces
        if (/[^a-zA-Z0-9_]/.test(inputValue)) {
            // If special character or space is found, do nothing (freeze input)
            setError('Special characters are not allowed.');
            return;
        }
        setter(inputValue);
    };

    return (
        <div>
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className=" mx-auto flex justify-center items-center">
                        <div className="flex space-x-4">
                            <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/Teatypehome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
                            <Link to="/teatypes/creates" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production machine availability</Link>
                            <Link to="/TeaTypeReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">tea type report genarate</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                                <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100' style={{ backgroundImage: "url('/images/create.png')" }}>
                <BackButtonForCreateProduction />
                <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                    <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create tea type Schedule</h1>

                    {loading && <Spinner />}

                    <div className='space-y-4'>
                        <div className='mb-4 hidden'>
                            <label htmlFor='Schedule_no' className='text-lg text-gray-600'>Schedule No</label>
                            <input
                                id='Schedule_no'
                                type='number'
                                value={Schedule_no}
                                readOnly
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='black_tea' className='text-lg text-gray-600'>black_tea</label>
                            <input
                                id='black_tea'
                                type='number'
                                value={black_tea}
                                onChange={handleInputChange(setblack_tea)}
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='green_tea' className='text-lg text-gray-600'>green_tea</label>
                            <input
                                id='green_tea'
                                type='number'
                                value={green_tea}
                                onChange={handleInputChange(setgreen_tea)}
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='oolong_tea' className='text-lg text-gray-600'>oolong_tea</label>
                            <input
                                id='oolong_tea'
                                type='number'
                                value={oolong_tea}
                                onChange={handleInputChange(setoolong_tea)}
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='white_tea' className='text-lg text-gray-600'>white_tea</label>
                            <input
                                id='white_tea'
                                type='number'
                                value={white_tea}
                                onChange={handleInputChange(setwhite_tea)}
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='tea_wastage' className='text-lg text-gray-600'>Tea Wastage</label>
                            <input
                                id='tea_wastage'
                                type='number'
                                value={tea_wastage}
                                onChange={handleInputChange(setTea_wastage)}
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4 hidden'>
                            <label htmlFor='status' className='text-lg text-gray-600'>Status</label>
                            <input
                                id='status'
                                type='text'
                                value={status}
                                readOnly
                                className='input-field'
                            />
                        </div>

                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                            onClick={handleSaveteatypes}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Createteatypes;
