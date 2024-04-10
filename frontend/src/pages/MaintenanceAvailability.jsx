import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';

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
        <div>
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center"> {/* Add justify-center class */}
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenances</Link>
                            <Link to="/maintenances/creates" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/MaintenanceAvailability" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenance report generate</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='p-4'>
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
                                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Warrenty Information</th>
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
        </div>
    );
}

export default MaintenanceAvailability;
