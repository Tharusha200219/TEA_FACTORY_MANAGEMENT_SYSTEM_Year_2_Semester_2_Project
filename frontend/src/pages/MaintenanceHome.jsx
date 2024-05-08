import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const MaintenanceHome = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/maintenances')
            .then((response) => {
                setMaintenances(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter maintenances based on search query
    const filteredMaintenances = maintenances.filter((maintenance) => {
        return Object.values(maintenance).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JS
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main content with navigation links */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MaintenanceHome" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                        <Link to="/maintenances/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                        <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                        <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-grow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">Maintenance List</h1>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto bg-white rounded shadow-md">
                        <table className="min-w-full table-fixed divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Number</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency in Days</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaintenances.map((maintenance) => (
                                    <tr key={maintenance._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{maintenance.machineNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{maintenance.machineName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{maintenance.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(maintenance.maintenanceDate)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{maintenance.frequencyInDays}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <div className="flex justify-center gap-x-4">
                                                <Link to={`/maintenances/details/${maintenance._id}`} className="text-green-800">
                                                    <BsInfoCircle className='text-2xl' />
                                                </Link>
                                                <Link to={`/maintenances/edit/${maintenance._id}`} className="text-yellow-600">
                                                    <AiOutlineEdit className='text-2xl' />
                                                </Link>
                                                <Link to={`/maintenances/delete/${maintenance._id}`} className="text-red-600">
                                                    <MdOutlineDelete className='text-2xl' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MaintenanceHome;
