import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const SupplyRecordTable = () => {
    const [supplyrecord, setSupplyRecord] = useState([]); 
    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/supplyrecords')
            .then((response) => {
                console.log('Fetched supply record:', response.data);
                setSupplyRecord(response.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching supply record:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-20'>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold text-gray-800'>Supply Records Table</h1>
                <Link
                    to='/supplyrecords/create'
                    className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center'>
                Add New
               </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-collapse border border-gray-300'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='border border-gray-300 p-4 text-left'>Supplier</th>
                            <th className='border border-gray-300 p-4 text-left'>Date</th>
                            <th className='border border-gray-300 p-4 text-left'>Quantity</th>
                            <th className='border border-gray-300 p-4'>Unit price</th>
                            <th className='border border-gray-300 p-4'>Cost</th>
                            <th className='border border-gray-300 p-4'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyrecord.map((item, index) => ( 
                            <tr key={item._id} className='border border-gray-300'>
                                <td className='border border-gray-300 p-4'>{item.supplier}</td>
                                <td className='border border-gray-300 p-4'>{item.date}</td>
                                <td className='border border-gray-300 p-4'>{item.quantity}</td>
                                <td className='border border-gray-300 p-4'>{item.unitPrice}</td>
                                <td className='border border-gray-300 p-4'>{item.quantity * item.unitPrice}</td>
                                <td className='border border-gray-300 p-4'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/supplyrecords/details/${item._id}`} className='text-2xl text-green-800'>
                                            <BsInfoCircle />
                                        </Link>
                                        <Link to={`/supplyrecords/edit/${item._id}`} className='text-2xl text-yellow-600'>
                                            <AiOutlineEdit />
                                        </Link>
                                        <Link to={`/supplyrecords/delete/${item._id}`} className='text-2xl text-red-600'>
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
    );
}

export default SupplyRecordTable;
