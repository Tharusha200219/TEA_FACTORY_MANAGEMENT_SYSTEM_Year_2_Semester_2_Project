import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Createproductions = () => {
    const [Schedule_no, setSchedule_no] = useState('');
    const [Production_date, setProduction_date] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [Machine_assignment, setMachine_assignment] = useState('');
    const [shift_information, setShift_information] = useState('');
    const [Status, setStatus] = useState('not done');
    const [loading, setLoading] = useState(false);
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/machines')
            .then((response) => {
                setMachines(response.data.data.filter(machine => machine.Status === 'Available'));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Function to generate unique schedule numbers in ascending order
    const generateUniqueScheduleNo = () => {
        axios.get('http://localhost:5555/productions')
            .then((response) => {
                const existingScheduleNos = response.data.data.map(item => item.Schedule_no);
                const allScheduleNos = Array.from({ length: 1000 }, (_, index) => index + 1);
                const availableScheduleNos = allScheduleNos.filter(num => !existingScheduleNos.includes(num));
                if (availableScheduleNos.length > 0) {
                    setSchedule_no(availableScheduleNos[0].toString());
                } else {
                    alert('All schedule numbers from 1 to 1000 are used.');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Call the function to generate unique schedule number on component mount
    useEffect(() => {
        generateUniqueScheduleNo();
    }, []);

    const handleSaveproductions = () => {
        if (!selectedMachine) {
            alert('Please select a machine.');
            return;
        }

        if (!Quantity.includes('kg') && !Quantity.includes('KG') && !Quantity.includes('Kg')) {
            alert('Quantity must be in kilograms (e.g., 10 kg).');
            return;
        }

        if (!/^\d+$/.test(shift_information)) {
            setError('Shift Information must be a valid number in hours.');
            return;
        }

        const data = {
            Schedule_no,
            Production_date,
            Quantity,
            Machine_assignment: selectedMachine,
            shift_information,
            Status,
        };
        setLoading(true);
        axios.post('http://localhost:5555/productions', data)
            .then(() => {
                setLoading(false);
                setSchedule_no('');
                setProduction_date('');
                setQuantity('');
                setMachine_assignment('');
                setShift_information('');
                setStatus('');
                setSelectedMachine('');
                setError('');

                navigate('/Productionhome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false);
            });
    };

    // Function to validate production date (must be today onwards)
    const validateProductionDate = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate >= today;
    };

    // Function to check for special characters
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
            setError('Special characters are not allowed.');
            return;
        }
        setError('');
        setShift_information(inputValue.replace(/\s/g, '')); // Remove spaces
    };

    // Function to check for special characters in quantity input
    const handleQuantityChange = (e) => {
        const inputValue = e.target.value;
        if (/[^a-zA-Z0-9\s]/.test(inputValue)) {
            setError('Special characters are not allowed.');
            return;
        }
        setError('');
        setQuantity(inputValue.replace(/\s/g, '')); // Remove spaces
    };

    return (
        <div className='bg-gray-100 min-h-screen' style={{ backgroundImage: "url('/images/create.png')" }}>

            {/* Navigation Bar */}
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                            
                        </Link>
                    </div>
                </div>
            </nav>

            <div className='flex flex-col items-center justify-center'>
                <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
                    <h1 className='text-3xl mb-4 font-bold text-gray-800 text-center'>Create Production Schedule</h1>

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
                            <label htmlFor='Production_date' className='text-lg text-gray-600'>Production Date</label>
                            <input
                                id='Production_date'
                                type='date'
                                min={new Date().toISOString().split('T')[0]} // Set minimum date as today
                                value={Production_date}
                                onChange={(e) => setProduction_date(e.target.value)}
                                className='input-field'
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='Quantity' className='text-lg text-gray-600'>Quantity (in kg)</label>
                            <input
                                id='Quantity'
                                type='text'
                                value={Quantity}
                                onChange={handleQuantityChange}
                                placeholder='e.g., 100 kg'
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4'>
                            <label htmlFor='Machine_assignment' className='text-lg text-gray-600'>Machine Assignment</label>
                            <select
                                id='Machine_assignment'
                                value={selectedMachine}
                                onChange={(e) => setSelectedMachine(e.target.value)}
                                className='input-field'
                            >
                                <option value='' disabled>Select machine</option>
                                {machines.map((machine) => (
                                    <option key={machine._id} value={machine.machineName}>{machine.machineName}</option>
                                ))}
                            </select>

                        </div>

                        <div className='mb-4'>
                            <label htmlFor='shift_information' className='text-lg text-gray-600'>Shift Information (in hours)</label>
                            <input
                                id='shift_information'
                                type='text'
                                value={shift_information}
                                onChange={handleInputChange}
                                placeholder='e.g., 8'
                                className='input-field'
                            />
                            {error && <p className='text-red-500'>{error}</p>}
                        </div>

                        <div className='mb-4 hidden'>
                            <label htmlFor='Status' className='text-lg text-gray-600'>Status</label>
                            <input
                                id='Status'
                                type='text'
                                value={Status}
                                readOnly
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
            <br></br>
            <Footer />
        </div>
    );
};

export default Createproductions;
