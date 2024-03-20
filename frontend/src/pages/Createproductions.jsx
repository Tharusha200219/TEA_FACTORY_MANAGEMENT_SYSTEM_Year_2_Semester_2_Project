import React, { useState } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createproductions = () => {
    const [Schedule_no, setSchedule_no] = useState('');
    const [Production_date, setProduction_date] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Machine_assignment, setMachine_assignment] = useState('');
    const [shift_information, setShift_information] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveproductions = () => {
        const data = {
            Schedule_no,
            Production_date,
            Quantity,
            Machine_assignment,
            shift_information,
        };
        setLoading(true);
        axios.post('http://localhost:5555/productions', data)
            .then(() => {
                setLoading(false);
                navigate('/Productionhome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false); // Make sure to set loading to false in case of error
            });
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <BackButtonForCreateProduction />
            <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Production Schedule</h1>

                {loading && <Spinner />}

                <div className='space-y-4'>
                    <div className='mb-4'>
                        <label htmlFor='Schedule_no' className='text-lg text-gray-600'>Schedule No</label>
                        <input
                            id='Schedule_no'
                            type='number'
                            value={Schedule_no}
                            onChange={(e) => setSchedule_no(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='Production_date' className='text-lg text-gray-600'>Production Date</label>
                        <input
                            id='Production_date'
                            type='date'
                            value={Production_date}
                            onChange={(e) => setProduction_date(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='Quantity' className='text-lg text-gray-600'>Quantity</label>
                        <input
                            id='Quantity'
                            type='text'
                            value={Quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='Machine_assignment' className='text-lg text-gray-600'>Machine Assignment</label>
                        <input
                            id='Machine_assignment'
                            type='text'
                            value={Machine_assignment}
                            onChange={(e) => setMachine_assignment(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='shift_information' className='text-lg text-gray-600'>Shift Information</label>
                        <input
                            id='shift_information'
                            type='number'
                            value={shift_information}
                            onChange={(e) => setShift_information(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                        onClick={handleSaveproductions}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Createproductions;
