import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar';

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
                        <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Teatypehome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
                        <Link to="/teatypes/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/TeaTypeReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
                    </div>
                </div>
            </nav>

            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Tea Type List</h1>
                    <Link to='/productions/creates'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
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
                            className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 rounded-md appearance-none"
                        >
                            <option value="Schedule_no">Schedule No</option>
                            <option value="black_tea">Black Tea</option>
                            <option value="green_tea">Green Tea</option>
                            <option value="oolong_tea">Oolong Tea</option>
                            <option value="white_tea">White Tea</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.293 14.293a1 1 0 0 1-1.414-1.414L9.586 10 8.88 9.293a1 1 0 1 1 1.414-1.414l1 1a1 1 0 0 1 0 1.414l-1 1a1 1 0 0 1-.707.293z"/></svg>
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
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Black Tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Green Tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Oolong Tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>White Tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
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
            <footer style={{ backgroundColor: '#3FC060' }} className="text-white py-4 mt-8">
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

export default Teatypehome;
