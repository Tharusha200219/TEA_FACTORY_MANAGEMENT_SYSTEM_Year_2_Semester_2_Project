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
    const [maintenanceDate, setMaintenanceDate] = useState(getTodayDate()); // Get today's date
    const [frequencyInDays, setFrequencyInDays] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get today's date in the format yyyy-mm-dd
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
                console.log(error);
                setLoading(false);
            });
    };

    // Function to handle input change and validate machineNumber
    const handleMachineNumberChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input !== '' && input <= 1000) {
            setMachineNumber(input);
            setErrorMessage('');
        } else {
            setMachineNumber('');
            setErrorMessage('Machine Number must be a number between 1 and 1000');
        }
    };

    // Function to handle input change and validate machineName
    const handleMachineNameChange = (e) => {
        const input = e.target.value;
        if (/^M\d{0,3}$/.test(input) || input === '' || input === 'M') {
            setMachineName(input);
            setErrorMessage('');
        } else {
            setMachineName('');
            setErrorMessage('Machine Name must start with "M" followed by up to three digits (e.g., M123)');
        }
    };

    // Function to handle input change and validate description
    const handleDescriptionChange = (e) => {
        const input = e.target.value;
        if (/^[a-zA-Z0-9\s]*$/.test(input) && input.length <= 50) {
            setDescription(input);
            setErrorMessage('');
        } else {
            setDescription('');
            setErrorMessage('Description can only contain letters, numbers, and spaces, and must be 50 characters or less');
        }
    };

    // Function to handle input change and validate frequencyInDays
    const handleFrequencyInDaysChange = (e) => {
        const input = e.target.value;
        if (/^\d+$/.test(input) && input >= 1 && input <= 30) {
            setFrequencyInDays(input);
            setErrorMessage('');
        } else {
            // Clear input if it's not a valid number
            setFrequencyInDays('');
            setErrorMessage('Frequency In Days must be a number between 1 and 30');
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen' style={{ backgroundImage: "url('/images/create.png')" }}>
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                            <Link to="/maintenances/create" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                            <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report Generate</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex flex-col items-center justify-center min-h-screen'>
                <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                    <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Maintenance Schedule</h1>
                    {loading && <Spinner />}
                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
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
                                onChange={handleMachineNameChange}
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='description' className='text-lg text-gray-600'>Description</label>
                            <input
                                id='description'
                                type='text'
                                value={description}
                                onChange={handleDescriptionChange}
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
                                min={getTodayDate()} // Set min date to today
                                max={getTodayDate()} // Set max date to today
                                className='input-field'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='frequencyInDays' className='text-lg text-gray-600'>Frequency In Days</label>
                            <input
                                id='frequencyInDays'
                                type='number'
                                value={frequencyInDays}
                                onChange={handleFrequencyInDaysChange} // Validate input
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
