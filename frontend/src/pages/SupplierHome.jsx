import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const SupplierHome = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/suppliers')
            .then((response) => {
                console.log('Fetched suppliers:', response.data);
                setSuppliers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/SupplierHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Suppliers</Link>
                            <Link to="/SupplyRecordTable" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Supply Records</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='p-20' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supplier Table</h1>
                    <Link
                        to='/suppliers/create'
                        className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center'>
                        Add New
                    </Link>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-collapse border border-gray-300 '>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='border border-gray-300 p-4 text-left'>Supplier ID</th>
                                <th className='border border-gray-300 p-4 text-left'>Name</th>
                                <th className='border border-gray-300 p-4 text-left'>Address</th>
                                <th className='border border-gray-300 p-4'>ContactNo</th>
                                <th className='border border-gray-300 p-4'>Email</th>
                                <th className='border border-gray-300 p-4'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((item, index) => (
                                <tr key={item._id} className='border border-gray-300'>
                                    <td className='border border-gray-300 p-4'>{item.supplierid}</td>
                                    <td className='border border-gray-300 p-4'>{item.name}</td>
                                    <td className='border border-gray-300 p-4'>{item.address}</td>
                                    <td className='border border-gray-300 p-4'>{item.contact}</td>
                                    <td className='border border-gray-300 p-4'>{item.email}</td>
                                    <td className='border border-gray-300 p-4'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/suppliers/details/${item._id}`} className='text-2xl text-green-800'>
                                                <BsInfoCircle />
                                            </Link>
                                            <Link to={`/suppliers/edit/${item._id}`} className='text-2xl text-yellow-600'>
                                                <AiOutlineEdit />
                                            </Link>
                                            <Link to={`/suppliers/delete/${item._id}`} className='text-2xl text-red-600'>
                                                <MdOutlineDelete />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
             {/* Footer */}
             <footer style={{ backgroundColor: '#3FC060', position: 'absolute', bottom: 0, left: 0, right: 0 }} className="text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 1998-{new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                </div>
            </footer>
        </div>
        
    );
}

export default SupplierHome;
