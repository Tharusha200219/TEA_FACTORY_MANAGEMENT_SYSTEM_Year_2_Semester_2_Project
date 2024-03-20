import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Productionhome = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                setProductions(response.data.data);
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
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">productions</Link>
                            <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production machine availability</Link>
                            <Link to="/pending-new-stocks" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production report genarate</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Production List</h1>
                    <Link to='/productions/creates'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Production Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Assignment</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Shift Information</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productions.map((production, index) => (
                                    <tr key={production._id} className='h-8'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Schedule_no}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Production_date}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Quantity}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Machine_assignment}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.shift_information}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/productions/details/${production._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/productions/edit/${production._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                </Link>
                                                <Link to={`/productions/delete/${production._id}`}>
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

export default Productionhome;
