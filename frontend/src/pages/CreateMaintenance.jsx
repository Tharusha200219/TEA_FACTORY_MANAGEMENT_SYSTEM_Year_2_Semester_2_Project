import React, { useState } from 'react';

import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const CreateMaintenance = () => {
    const [machineNumber, setmachineNumber] = useState('');
    const [machineName, setmachineName] = useState('');
    const [description, setdescription] = useState('');
    const [maintenanceDate, setmaintenanceDate] = useState('');
    const [frequencyInDays, setfrequencyInDays] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSavemaintenances = () => {
        const data = {
          machineNumber,
          machineName,
          description,
          maintenanceDate,
          frequencyInDays,
        };
        setLoading(true);
        axios.post('http://localhost:5555/maintenances', data)
            .then(() => {
                setLoading(false);
                navigate('/MaintenanceHome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false); // Make sure to set loading to false in case of error
            });
    };

    return (
        <div> {/* Navigation Bar */}
        <NavigationBar />
        
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            
            <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Maintenance Schedule</h1>

                {loading && <Spinner />}

                <div className='space-y-4'>
                    <div className='mb-4'>
                        <label htmlFor='machineNumber' className='text-lg text-gray-600'>machineNumber</label>
                        <input
                            id='machineNumber'
                            type='number'
                            value={machineNumber}
                            onChange={(e) => setmachineNumber(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='machineName' className='text-lg text-gray-600'>machineName</label>
                        <input
                            id='machineName'
                            type='text'
                            value={machineName}
                            onChange={(e) => setmachineName(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='description' className='text-lg text-gray-600'>description</label>
                        <input
                            id='description'
                            type='text'
                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='maintenanceDate' className='text-lg text-gray-600'>maintenanceDate</label>
                        <input
                            id='maintenanceDate'
                            type='date'
                            value={maintenanceDate}
                            onChange={(e) => setmaintenanceDate(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='frequencyInDays' className='text-lg text-gray-600'>frequencyInDays</label>
                        <input
                            id='frequencyInDays'
                            type='number'
                            value={frequencyInDays}
                            onChange={(e) => setfrequencyInDays(e.target.value)}
                            className='input-field'
                        />
                    </div>

                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                        onClick={handleSavemaintenances}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CreateMaintenance;