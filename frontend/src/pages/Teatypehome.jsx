import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Teatypehome = () => {
    const [teatypes, setTeatypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredTeatypes = teatypes.filter(teatype => {
        return (
            (teatype.Schedule_no && teatype.Schedule_no.toString().includes(searchTerm)) ||
            (teatype.black_tea && typeof teatype.black_tea === 'string' && teatype.black_tea.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (teatype.green_tea && typeof teatype.green_tea === 'string' && teatype.green_tea.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (teatype.oolong_tea && typeof teatype.oolong_tea === 'string' && teatype.oolong_tea.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (teatype.white_tea && typeof teatype.white_tea === 'string' && teatype.white_tea.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
    

    return (
        <div>
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">productions</Link>
                            <Link to="/teatypes/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production machine availability</Link>
                            <Link to="/pending-new-stocks" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production report genarate</Link>
                        </div>
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
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by schedule no or tea type"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-3 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 rounded-md"
                    />
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>black_tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>green_tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>oolong_tea</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>white_tea</th>
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
