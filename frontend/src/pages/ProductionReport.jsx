import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductionReport = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                // Remove T00:00:00.000Z from the date and format it as YYYY-MM-DD
                const formattedProductions = response.data.data.map(prod => ({
                    ...prod,
                    Production_date: new Date(prod.Production_date).toISOString().split('T')[0]
                }));
                setProductions(formattedProductions);
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
                            <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                            <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                            <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                            <Link to="/pending-new-stocks" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Report Table */}
            <div className='p-4'>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            {/* Table header */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Assignment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Information</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productions.map((production, index) => (
                                    <tr key={index} className='h-8'>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Schedule_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Production_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Machine_assignment}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.shift_information}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Status}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#3FC060' }} className="text-white py-4 mt-8">
                {/* Footer content */}
            </footer>

            {/* Toast Container for Notifications */}
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default ProductionReport;
