import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CreateMaintenance = () => {
    const [machineNumber, setMachineNumber] = useState('');
    const [machineName, setMachineName] = useState('');
    const [description, setDescription] = useState('');
    const [maintenanceDate, setMaintenanceDate] = useState('');
    const [frequencyInDays, setFrequencyInDays] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveMaintenances = () => {
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
                setLoading(false);
            });
    };

    // Function to handle input change and validate machineNumber
    const handleMachineNumberChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input)) {
            // If input is numeric, set machineNumber
            setMachineNumber(input);
        } else {
            // If input is not numeric, show an alert
            alert('Machine Number can only contain numbers');
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen' style={{ backgroundImage: "url('/images/create.png')" }}>
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                            <Link to="/maintenances/create" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                            <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report Generate</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                    <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Maintenance Schedule</h1>
                    {loading && <Spinner />}
                    <div className='space-y-4'>
                        <div className='mb-4'>
                            <label htmlFor='machineNumber' className='text-lg text-gray-600'>Machine Number</label>
                            <input
                                id='machineNumber'
                                type='text'
                                value={machineNumber}
                                onChange={handleMachineNumberChange}
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='machineName' className='text-lg text-gray-600'>Machine Name</label>
                            <input
                                id='machineName'
                                type='text'
                                value={machineName}
                                onChange={(e) => setMachineName(e.target.value)}
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='description' className='text-lg text-gray-600'>Description</label>
                            <input
                                id='description'
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='maintenanceDate' className='text-lg text-gray-600'>Maintenance Date</label>
                            <input
                                id='maintenanceDate'
                                type='date'
                                value={maintenanceDate}
                                onChange={(e) => setMaintenanceDate(e.target.value)}
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='frequencyInDays' className='text-lg text-gray-600'>Frequency In Days</label>
                            <input
                                id='frequencyInDays'
                                type='number'
                                value={frequencyInDays}
                                onChange={(e) => setFrequencyInDays(e.target.value)}
                                className='input-field'
                            />
                        </div>
                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                            onClick={handleSaveMaintenances}
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

export default CreateMaintenance;
