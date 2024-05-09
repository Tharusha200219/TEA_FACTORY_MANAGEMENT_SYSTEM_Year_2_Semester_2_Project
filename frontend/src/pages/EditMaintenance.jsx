import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const EditMaintenance = () => {
    const [machineNumber, setmachineNumber] = useState('');
    const [machineName, setmachineName] = useState('');
    const [description, setdescription] = useState('');
    const [maintenanceDate, setmaintenanceDate] = useState('');
    const [frequencyInDays, setfrequencyInDays] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/maintenances/${id}`)
            .then((response) => {
                setmachineNumber(response.data.machineNumber);
                setmachineName(response.data.machineName);
                setdescription(response.data.description);
                // Extracting only the date part of the maintenance date
                setmaintenanceDate(response.data.maintenanceDate.split('T')[0]);
                setfrequencyInDays(response.data.frequencyInDays);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('There was an error. Please check the console.');
                console.log(error);
            });
    }, [id]);

    const handleEditMaintenance = () => {
        const data = {
            machineNumber,
            machineName,
            description,
            maintenanceDate,
            frequencyInDays,
        };
        setLoading(true);
        axios.put(`http://localhost:5555/maintenances/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/MaintenanceHome');
            })
            .catch((error) => {
                setLoading(false);
                alert('An error occurred. Please check the console.');
                console.log(error);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: "url('/images/create.png')" }}>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Secondary Navigation Bar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MaintenanceHome" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                        <Link to="/maintenances/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                        <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
                    <h1 className="text-3xl mb-6 font-bold text-gray-800 text-center">Edit Maintenance</h1>

                    {loading && <Spinner />}

                    <div className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="machineNumber" className="text-lg text-gray-600">Machine Number</label>
                            <input
                                id="machineNumber"
                                type="number"
                                value={machineNumber}
                                readOnly // Set input field as read-only
                                className="input-field"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="machineName" className="text-lg text-gray-600">Machine Name</label>
                            <input
                                id="machineName"
                                type="text"
                                value={machineName}
                                readOnly // Set input field as read-only
                                className="input-field"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="text-lg text-gray-600">Description</label>
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="maintenanceDate" className="text-lg text-gray-600">Maintenance Date</label>
                            <input
                                id="maintenanceDate"
                                type="text"
                                value={maintenanceDate}
                                onChange={(e) => setmaintenanceDate(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="frequencyInDays" className="text-lg text-gray-600">Frequency In Days</label>
                            <input
                                id="frequencyInDays"
                                type="number"
                                value={frequencyInDays}
                                onChange={(e) => setfrequencyInDays(e.target.value)}
                                className="input-field"
                            />
                        </div>

                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full"
                            onClick={handleEditMaintenance}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EditMaintenance;
