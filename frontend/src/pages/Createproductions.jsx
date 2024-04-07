import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar'; // Import the NavigationBar component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

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

    const handleSaveproductions = () => {
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
                
                navigate('/Productionhome');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                    </div>
                </div>
            </nav>

            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
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
                            <select
                                id='Machine_assignment'
                                value={selectedMachine}
                                onChange={(e) => setSelectedMachine(e.target.value)}
                                className='input-field'
                            >
                                <option value='' disabled>Select machine</option>
                                {machines.map((machine) => (
                                    <option key={machine._id} value={machine.machineNumber}> {machine.machineName}</option>
                                ))}
                            </select>
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

                        <div className='mb-4'>
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
        </div>
    );
};

export default Createproductions;
