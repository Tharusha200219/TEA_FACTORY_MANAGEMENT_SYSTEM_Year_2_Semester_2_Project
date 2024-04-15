import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
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

    return (
        <div> {/* Navigation Bar */}
        <NavigationBar />

        <div>
 {/* Navigation Bar */}
<nav className="bg-green-500 p-4">
    <div className="container mx-auto flex justify-center"> {/* Add justify-center class */}
        <div className="flex justify-between items-center">
            <div className="flex space-x-4">
                <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/MaintenanceHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenances</Link>
                <Link to="/maintenances/creates" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                <Link to="/MaintenanceAvailability" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                <Link to="/MaintenanceReport" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenance report generate</Link>
            </div>
        </div>
    </div>
</nav>



            {/* Main Content */}
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Maintenance List</h1>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <Link to='/maintenances/create'>
                            <MdOutlineAddBox className='text-sky-800 text-4xl' />
                        </Link>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Number</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Name</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Maintenance Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Frequency in Days</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaintenances.map((maintenance, index) => (
                                    <tr key={maintenance._id}>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineNumber}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineName}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.description}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.maintenanceDate}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.frequencyInDays}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/maintenances/details/${maintenance._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/maintenances/edit/${maintenance._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                </Link>
                                                <Link to={`/maintenances/delete/${maintenance._id}`}>
                                                    <MdOutlineDelete className='text-2xl text-red-600' />
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

           
        </div>
        <Footer />
        </div>
    );
}

export default MaintenanceHome;
