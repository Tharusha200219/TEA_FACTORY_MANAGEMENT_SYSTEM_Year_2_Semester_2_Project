import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const MachineHome = () => {
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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMachines = machines.filter((machine) => {
        return Object.values(machine).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const updateStatus = (machineId, status) => {
        axios.put(`http://localhost:5555/machines/${machineId}`, { Status: status })
            .then(response => {
                console.log("Machine status updated successfully:", response.data);
                const updatedMachines = machines.map(machine => {
                    if (machine._id === machineId) {
                        return { ...machine, Status: status };
                    }
                    return machine;
                });
                setMachines(updatedMachines);
            })
            .catch(error => {
                console.log("Error updating machine status:", error);
            });
    };

    // Function to format date to 'YYYY-MM-DD'
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machines</Link>
                        <Link to="/machines/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Machine</Link>
                        <Link to="/MachineReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machine Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex-grow p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl my-8">Machine Management</h1>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 bg-white rounded-lg shadow-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Machine Number
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Machine Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Machine Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Installation Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Warranty Information
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMachines.map((machine) => (
                                    <tr key={machine._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {machine.machineNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {machine.machineName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {machine.machineType}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {formatDate(machine.installationDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {machine.warrentyInformation}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {machine.Status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => updateStatus(machine._id, 'Available')}
                                                    className={`btn ${machine.Status === 'Available' ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-lg px-4 py-2 hover:bg-green-600`}
                                                >
                                                    Available
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(machine._id, 'Not Available')}
                                                    className={`btn ${machine.Status === 'Not Available' ? 'bg-red-500' : 'bg-gray-300'} text-white rounded-lg px-4 py-2 hover:bg-red-600`}
                                                >
                                                    Not Available
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(machine._id, 'Under Maintenance')}
                                                    className={`btn ${machine.Status === 'Under Maintenance' ? 'bg-orange-500' : 'bg-gray-300'} text-white rounded-lg px-4 py-2 hover:bg-orange-600`}
                                                >
                                                    Maintenance
                                                </button>
                                                <Link to={`/machines/details/${machine._id}`}>
                                                    <BsInfoCircle className="text-2xl text-green-600 hover:text-green-800" />
                                                </Link>
                                                <Link to={`/machines/edit/${machine._id}`}>
                                                    <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-800" />
                                                </Link>
                                                <Link to={`/machines/delete/${machine._id}`}>
                                                    <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-800" />
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
            <Footer />
        </div>
    );
};

export default MachineHome;
