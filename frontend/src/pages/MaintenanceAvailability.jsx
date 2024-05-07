import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const MaintenanceAvailability = () => {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/machines')
            .then((response) => {
                setMachines(response.data.data);
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

    // Filter machines based on search query
    const filteredMachines = machines.filter((machine) => {
        return Object.values(machine).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Filter machines with 'Under Maintenance' status
    const underMaintenanceMachines = filteredMachines.filter(machine => machine.Status === 'Under Maintenance');

    return (
        <div className='min-h-screen flex flex-col'>
            <NavigationBar />

            {/* Navigation bar below NavigationBar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center"> {/* Add justify-center class */}
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                            <Link to="/maintenances/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                            <Link to="/MaintenanceAvailability" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report Generate</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='flex-grow p-4'>
                <h1 className='text-2xl my-8'>Machines Under Maintenance</h1>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Number</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Name</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Type</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Installation Date</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Warranty Information</th>
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {underMaintenanceMachines.map((machine, index) => (
                                    <tr key={machine._id} className='h-10'>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.machineNumber}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.machineName}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.machineType}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.installationDate}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.warrentyInformation}</td>
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.Status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer at the bottom of the page */}
            <Footer />
        </div>
    );
};

export default MaintenanceAvailability;
