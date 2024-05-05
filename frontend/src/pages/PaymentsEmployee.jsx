import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PaymentsEmployee = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/paymentsEmployee')
            .then((response) => {
                console.log('Fetched employee payments:', response.data);
                setPayments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employee payments:', error);
                setLoading(false);
            });
    }, []);

    const handleShowDeleteConfirmation = (payment) => {
        setSelectedPayment(payment);
        setShowDeleteConfirmation(true);
    };

    const handleHideDeleteConfirmation = () => {
        setSelectedPayment(null);
        setShowDeleteConfirmation(false);
    };

    const handleDeletePayment = () => {
        axios.delete(`http://localhost:5555/paymentsEmployee/delete/${selectedPayment._id}`)
            .then(() => {
                // Remove the deleted payment from the payments list
                const updatedPayments = payments.filter(payment => payment._id !== selectedPayment._id);
                setPayments(updatedPayments);
                handleHideDeleteConfirmation(); // Hide the delete confirmation dialog
            })
            .catch((error) => {
                console.error('Error deleting employee payment:', error);
                // Handle error, show message, etc.
            });
    };

    useEffect(() => {
        const filtered = payments.filter(payment =>
            payment.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    }, [searchTerm, payments]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const generateReport = () => {
        try {
            const doc = new jsPDF();
            doc.text('Employee Payment Report', 10, 10);

            // Table headers
            const headers = ['Employee ID', 'Amount', 'Method', 'Start Date', 'End Date'];

            // Table data
            const data = payments.map(item => [
                item.employeeId,
                item.amount,
                item.method,
                formatDate(item.startDate),
                formatDate(item.endDate),
            ]);

            // Set table position and styling
            const startY = 20;
            const tableProps = {
                margin: { top: 20 },
                headStyles: { fillColor: [100, 100, 255] }, // Blue color for header
                bodyStyles: { fillColor: 255 }, // White color for body
            };

            // Add table to the PDF
            doc.autoTable({ head: [headers], body: data, startY, ...tableProps });

            doc.save('employee_payment_report.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Navigation */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Your Company Name
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/paymentsEmployee" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee Payments</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto flex justify-center items-center h-full ">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-8">Welcome to Ever Green Tea</h1>
                    <div className="space-y-4">
                        <Link to="/PaymentsHome">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Suppliers
                            </button>
                        </Link>
                        <Link to="/PaymentsEmployee">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Employees
                            </button>
                        </Link>

                    </div>
                </div>
            </div>

            {/* Payment Table */}
            <div className='p-20' style={{ paddingBottom: '100px' }}>
                <div className="flex justify-between items-center mb-8">
                    <input
                        type="text"
                        placeholder="Search by Employee ID or Amount"
                        value={searchTerm}
                        onChange={handleSearch}
                        className='border border-gray-300 p-2'
                    />
                    <button className='bg-green-500 text-white py-2 px-4 rounded ml-4' onClick={generateReport}>
                        Generate Report
                    </button>
                </div>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Employee Payment Table</h1>
                    <Link
                        to='/paymentsEmployee/create'
                        className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center'>
                        Add New Payment
                    </Link>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-collapse border border-gray-300 '>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='border border-gray-300 p-4 text-left'>Employee ID</th>
                                <th className='border border-gray-300 p-4 text-left'>Amount</th>
                                <th className='border border-gray-300 p-4 text-left'>Method</th>
                                <th className='border border-gray-300 p-4 text-left'>Start Date</th>
                                <th className='border border-gray-300 p-4 text-left'>End Date</th>
                                <th className='border border-gray-300 p-4'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((item) => (
                                <tr key={item._id} className='border border-gray-300'>
                                    <td className='border border-gray-300 p-4'>{item.employeeId}</td>
                                    <td className='border border-gray-300 p-4'>{item.amount}</td>
                                    <td className='border border-gray-300 p-4'>{item.method}</td>
                                    <td className='border border-gray-300 p-4'>{formatDate(item.startDate)}</td>
                                    <td className='border border-gray-300 p-4'>{formatDate(item.endDate)}</td>
                                    <td className='border border-gray-300 p-4'>
                                        <div className='flex justify-center gap-x-4'>
                                            <Link to={`/paymentsEmployee/edit/${item._id}`} className='text-2xl text-yellow-600'>
                                                <AiOutlineEdit />
                                            </Link>
                                            <button onClick={() => handleShowDeleteConfirmation(item)} className='text-2xl text-red-600'>
                                                <MdOutlineDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded shadow-md">
                        <p className="text-xl font-bold mb-4">Confirm Deletion</p>
                        <p>Are you sure you want to delete this payment?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleDeletePayment} className="bg-red-500 text-white py-2 px-4 rounded mr-4">Delete</button>
                            <button onClick={handleHideDeleteConfirmation} className="bg-gray-300 text-gray-800 py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer style={{ backgroundColor: '#3FC060', position: 'absolute', bottom: 0, left: 0, right: 0 }} className="text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default PaymentsEmployee;
