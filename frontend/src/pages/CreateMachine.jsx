import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link component
import NavigationBar from '../components/NavigationBar';

const CreateMachine = () => {
    const [machineNumber, setmachineNumber] = useState('');
    const [machineName, setmachineName] = useState('');
    const [machineType, setmachineType] = useState('');
    const [installationDate, setinstallationDate] = useState('');
    const [warrentyInformation, setwarrentyInformation] = useState('');
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSavemachines = () => {
        const data = {
          machineNumber,
          machineName,
          machineType,
          installationDate,
          warrentyInformation,
          Status: 'Available'
        };
        setLoading(true);
        axios.post('http://localhost:5555/machines', data)
            .then(() => {
                setLoading(false);
                navigate('/MachineHome');
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
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machines</Link>
                        <Link to="/machines/creates" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create table</Link>
                        
                        <Link to="/MachineReport" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machine report generate</Link>
                    </div>
                </div>
            </nav>
            {/* End Navigation Bar */}
        
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                    <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Machine Schedule</h1>

                    {loading && <Spinner />}

                    <div className='space-y-4'>
                        <div className='mb-4'>
                            <label htmlFor='machineNumber' className='text-lg text-gray-600'>Machine Number</label>
                            <input
                                id='machineNumber'
                                type='number'
                                value={machineNumber}
                                onChange={(e) => setmachineNumber(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='machineName' className='text-lg text-gray-600'>Machine Name</label>
                            <input
                                id='machineName'
                                type='text'
                                value={machineName}
                                onChange={(e) => setmachineName(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='machineType' className='text-lg text-gray-600'>Machine Type</label>
                            <input
                                id='machineType'
                                type='text'
                                value={machineType}
                                onChange={(e) => setmachineType(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='installationDate' className='text-lg text-gray-600'>Installation Date</label>
                            <input
                                id='installationDate'
                                type='date'
                                value={installationDate}
                                onChange={(e) => setinstallationDate(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='warrentyInformation' className='text-lg text-gray-600'>Warrenty Information</label>
                            <input
                                id='warrentyInformation'
                                type='text'
                                value={warrentyInformation}
                                onChange={(e) => setwarrentyInformation(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                            onClick={handleSavemachines}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMachine;
