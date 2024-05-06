import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Teatypehome = () => {
    const [teatypes, setTeatypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('Schedule_no');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/teatypes')
            .then((response) => {
                setTeatypes(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchColumnChange = (event) => {
        setSearchColumn(event.target.value);
    };

    const updateStatus = (id) => {
        axios.put(`http://localhost:5555/teatypes/${id}`, { status: 'sent to the inventory' })
            .then((response) => {
                // Update the status in the state
                setTeatypes(prevState => {
                    return prevState.map(teatype => {
                        if (teatype._id === id) {
                            return { ...teatype, status: 'sent to the inventory' };
                        }
                        return teatype;
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredTeatypes = teatypes.filter(teatype => {
        return (
            (teatype[searchColumn] && teatype[searchColumn].toString().includes(searchTerm)) ||
            (typeof teatype[searchColumn] === 'string' && teatype[searchColumn].toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div>
            <NavigationBar />
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Teatypehome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
                        <Link to="/teatypes/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/TeaTypeReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        
                        </Link>
                    </div>
                </div>
            </nav>

            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Tea Type List</h1>
                    
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 rounded-md mr-2"
                    />
                    <div className="relative">
                        <select
                            value={searchColumn}
                            onChange={handleSearchColumnChange}
                            className="appearance-none pl-4 pr-8 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="Schedule_no">Schedule No</option>
                            <option value="black_tea">Black Tea</option>
                            <option value="green_tea">Green Tea</option>
                            <option value="oolong_tea">Oolong Tea</option>
                            <option value="white_tea">White Tea</option>
                            <option value="tea_wastage">Tea Wastage</option>
                            <option value="status">Status</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Black Tea (kg)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Green Tea (kg)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Oolong Tea (kg)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>White Tea (kg)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Tea Wastage</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Status</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTeatypes.map((teatype, index) => (
                                    <tr key={teatype._id} className='h-8'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.Schedule_no}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.black_tea}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.green_tea}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.oolong_tea}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.white_tea}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.tea_wastage}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{teatype.status}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/teatypes/details/${teatype._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/teatypes/edit/${teatype._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                </Link>
                                                <Link to={`/teatypes/delete/${teatype._id}`}>
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

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Teatypehome;
