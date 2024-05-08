import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CreateMachine = () => {
    const [machineNumber, setMachineNumber] = useState(1);
    const [machineName, setMachineName] = useState('');
    const [machineType, setMachineType] = useState('');
    const [installationDate, setInstallationDate] = useState('');
    const [warrentyInformation, setWarrentyInformation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5555/machines')
            .then((response) => {
                const lastMachineNumber = response.data.data.length + 1;
                setMachineNumber(lastMachineNumber);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Function to validate the machine name format
    const validateMachineName = (name) => {
        const regex = /^M\d{0,3}$/; // Machine name must start with 'M' followed by up to three digits (001-999)
        return regex.test(name);
    };

    const handleMachineNameChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input is empty or matches the machine name format
        if (validateMachineName(inputValue) || inputValue === '') {
            setMachineName(inputValue); // Update machineName state
            setError(''); // Clear any previous error message
        } else {
            // Show error if the input doesn't match the format
            setError('Machine name must begin with the letter "M" followed by up to three digits (e.g., M001).');
        }
    };

    const handleMachineTypeChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input contains only letters and spaces
        const regex = /^[a-zA-Z\s]*$/;
        if (regex.test(inputValue) || inputValue === '') {
            setMachineType(inputValue);
            setError(''); // Clear any previous error message
        } else {
            setError('Machine type can only contain letters and spaces.');
        }
    };

    const handleWarrentyInformationChange = (e) => {
        const inputValue = e.target.value;
        // Check if the input contains only alphanumeric characters and spaces
        const regex = /^[a-zA-Z0-9\s]*$/;
        if (regex.test(inputValue) || inputValue === '') {
            if (inputValue.length <= 20) {
                setWarrentyInformation(inputValue);
                setError(''); // Clear any previous error message
            } else {
                setError('Warranty information must be less than or equal to 20 characters.');
            }
        } else {
            setError('Warranty information can only contain alphanumeric characters and spaces.');
        }
    };

    const handleSaveMachines = () => {
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
                setLoading(false);
            });
    };

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Add leading zero if month or day is single digit
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: "url('/images/create.png')" }}>
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machines</Link>
                        <Link to="/machines/creates" className="text-white bg-black hover/bg-gray-700 hover/text-white px-3 py-2 rounded-md text-sm font-medium">Create table</Link>
                        <Link to="/MachineReport" className="text-white hover:bg-gray-700 hover/text-white px-3 py-2 rounded-md text-sm font-medium">Machine report generate</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
                    <h1 className="text-3xl mb-4 font-bold text-gray-800 text-center">Create Machine Schedule</h1>
                    {loading && <Spinner />}
                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="mb-4 hidden">
                            {/* Hidden machine number field */}
                            <label htmlFor="machineNumber" className="text-lg text-gray-600">Machine Number</label>
                            <input
                                id="machineNumber"
                                type="text"
                                value={machineNumber}
                                readOnly
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="machineName" className="text-lg text-gray-600">Machine Name</label>
                            <input
                                id="machineName"
                                type="text"
                                value={machineName}
                                onChange={handleMachineNameChange}
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="machineType" className="text-lg text-gray-600">Machine Type</label>
                            <input
                                id="machineType"
                                type="text"
                                value={machineType}
                                onChange={handleMachineTypeChange}
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="installationDate" className="text-lg text-gray-600">Installation Date</label>
                            <input
                                id="installationDate"
                                type="date"
                                value={getCurrentDate()} // Set value to current date
                                max={getCurrentDate()} // Set max attribute to today's date
                                onChange={(e) => setInstallationDate(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="warrentyInformation" className="text-lg text-gray-600">Warranty Information</label>
                            <input
                                id="warrentyInformation"
                                type="text"
                                value={warrentyInformation}
                                onChange={handleWarrentyInformationChange}
                                className="input-field"
                            />
                        </div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                            onClick={handleSaveMachines}
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

export default CreateMachine;
