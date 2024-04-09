import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const MaintenanceHome = () => {
    const [maintenances, setMaintenance] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/maintenances')
            .then((response) => {
                setMaintenance(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-gray-300   bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenances</Link>


                            <Link to="/maintenances/creates" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>

                            <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Availability </Link>
                            <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">maintenance report generate  </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Maintenance List</h1>
                    <Link to='/books/create'>
                        <MdOutlineAddBox className='text-sky-800 text-4x1' />
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>machineNumber</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>machineName</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>description</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>maintenanceDate</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>frequencyInDays</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {maintenances.map((maintenance, index) => (
                                    <tr key={maintenance._id} className='h-8'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineNumber}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineName}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.description}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.maintenanceDate}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.frequencyInDays}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/maintenances/details/${maintenance._id}`}>
                                                    <BsInfoCircle className='text-2x1 text-green-800' />
                                                </Link>
                                                <Link to={`/maintenances/edit/${maintenance._id}`}>
                                                    <AiOutlineEdit className='text-2x1 text-yellow-600' />
                                                </Link>
                                                <Link to={`/maintenances/delete/${maintenance._id}`}>
                                                    <MdOutlineDelete className='text-2x1 text-red-600' />
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
            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 1998-{new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                    <div>
                        {/* Add any additional footer content here */}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MaintenanceHome;
