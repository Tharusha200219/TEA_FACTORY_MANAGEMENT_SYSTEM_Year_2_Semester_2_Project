import React, { useState } from 'react';

import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'; // Don't forget to import Link
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
        <div>
            <NavigationBar />
            {/* Navigation Bar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenances</Link>
                            <Link to="/maintenances/creates" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/MaintenanceAvailability" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenance report generate</Link>
                        </div>
                    </div>
                </div>
            </nav>

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
