import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import companyLogo from '/images/logo.png'; 

const OrderPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]); // Define filteredPayments state
    const [file, setFile] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/orderPayments/')
            .then((response) => {
                console.log('Fetched order payments:', response.data);
                setPayments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employee payments:', error);
                setLoading(false);
            });
    }, []);

    const handleDeletePayment = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/orderPayments/${id}`);
            // Remove the deleted payment from the payments list
            const updatedPayments = payments.filter(payment => payment._id !== id);
            setPayments(updatedPayments);
        } catch (error) {
            console.error('Error deleting payment:', error);
            // Handle error, show message, etc.
        }
    };
    const handleFileUpload = (e, paymentId) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const formData = new FormData();
        formData.append('slip', selectedFile);

        axios.put(`http://localhost:5555/orderPayments/${paymentId}/upload-slip`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log('File uploaded successfully:', response.data);
            window.location.reload();
            // Handle any success behavior here, if needed
        }).catch((error) => {
            console.error('Error uploading file:', error);
            // Handle any error behavior here, if needed
        });
    };

    useEffect(() => {
        const filtered = payments.filter(payment =>
            payment.order?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    }, [searchTerm, payments]);

    const generateReport = (type) => {
        try {
            const doc = new jsPDF();
            let title = '';
            let data = [];
            const imgData = companyLogo;
            doc.addImage(imgData, 'PNG', 10, 10, 40, 40);
    
            // Set text color to ubber green
            doc.setTextColor(22, 160, 133);
    
            // Add main title "EVER GREEN TEA" with ubber green color
            doc.setFontSize(20);
            doc.text("EVER GREEN TEA", doc.internal.pageSize.width / 2, 20, { align: "center" });
    
            // Add title "Maintenance Report" with ubber green color
            doc.setFontSize(20);
    
            // Set text color back to black
            doc.setTextColor(0);
    
            // Add current date
            const date = new Date().toLocaleDateString();
            doc.setFontSize(10);
            doc.text(`Date: ${date}`, doc.internal.pageSize.width - 30, 20, { align: "right" });
    
            let headers = []; // Define headers variable
    
            if (type === 'income') {
                title = 'Monthly Income Report';
                headers = ['Month', 'Total Income'];
                data = calculateMonthlyIncome(filteredPayments);
            } else if (type === 'deliveryLocations') {
                title = 'Delivery Locations Report';
                headers = ['Location', 'Total Deliveries'];
                data = calculateDeliveryLocations(filteredPayments);
            }
    
            // Add title dynamically with alignment
            doc.setFontSize(18);
            doc.text(title, doc.internal.pageSize.width / 2, 60, { align: "center" });
    
            // Set table position and styling
            const startY = 70; // Adjusted startY value
            const tableProps = {
                margin: { top: 20 },
                headStyles: { fillColor: [100, 100, 255] }, // Blue color for header
                bodyStyles: { fillColor: 255 }, // White color for body
            };
    
            // Add table headers to the PDF
            doc.autoTable({ head: [headers], startY, ...tableProps });
    
            // Add table data to the PDF
            doc.autoTable({ body: data, startY: startY + 10, ...tableProps });
    
            doc.save(`${type}_report.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };
    
    // Function to calculate monthly income
    const calculateMonthlyIncome = (payments) => {
        const monthlyIncomeMap = {};
        payments.forEach((payment) => {
            const month = new Date(payment.order.duedate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            if (monthlyIncomeMap[month]) {
                monthlyIncomeMap[month] += payment.totalPrice;
            } else {
                monthlyIncomeMap[month] = payment.totalPrice;
            }
        });
    
        return Object.entries(monthlyIncomeMap).map(([month, totalIncome]) => [month, totalIncome.toFixed(2)]);
    };
    
    // Function to calculate delivery locations
    const calculateDeliveryLocations = (payments) => {
        const deliveryLocationsMap = {};
        payments.forEach((payment) => {
            const location = payment.order.address;
            if (deliveryLocationsMap[location]) {
                deliveryLocationsMap[location]++;
            } else {
                deliveryLocationsMap[location] = 1;
            }
        });
    
        return Object.entries(deliveryLocationsMap).map(([location, totalDeliveries]) => [location, totalDeliveries]);
    };
    

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    return (
        <div>
            <NavigationBar />

            {/* Payment Table */}
            <div className='p-20'>
                <div className="flex justify-between items-center mb-8">
                    <input
                        type="text"
                        placeholder="Search by Customer"
                        value={searchTerm}
                        onChange={handleSearch}
                        className='border border-gray-300 p-2'
                    />
                    <button className='bg-green-500 text-white py-2 px-4 rounded ml-4' onClick={() => generateReport('income')}>
                        Generate Income Monthly Report
                    </button>
                    <button className='bg-green-500 text-white py-2 px-4 rounded ml-4' onClick={() => generateReport('deliveryLocations')}>
                        Generate Delivery Locations in a Month Report
                    </button>

                </div>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Order Payment Table</h1>
                    <Link
                        to='/OrderPaymentsCreate'
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
                                <th className='border border-gray-300 p-4 text-left'>Order NO</th>
                                <th className='border border-gray-300 p-4 text-left'>Order Category</th>
                                <th className='border border-gray-300 p-4 text-left'>Date</th>
                                <th className='border border-gray-300 p-4 text-left'>Quantity</th>
                                <th className='border border-gray-300 p-4 text-left'>Delivery Location</th>
                                <th className='border border-gray-300 p-4 text-left'>Customer</th>
                                <th className='border border-gray-300 p-4 text-left'>Total Price</th>
                                <th className='border border-gray-300 p-4 text-left'>Slip</th>
                                <th className='border border-gray-300 p-4 text-left'>Status</th>
                                <th className='border border-gray-300 p-4'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map((item) => {
                                console.log("Item:", item);
                                console.log("Item.order:", item.order);
                                return (
                                    <tr key={item._id} className='border border-gray-300'>
                                        <td className='border border-gray-300 p-4'>{item.order ? item.order.orderno : ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.order ? item.order.category : ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.order ? new Date(item.order.duedate).toLocaleDateString() : ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.order ? item.order.quantity : ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.order ? item.order.address : ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.order?.name || ''}</td>
                                        <td className='border border-gray-300 p-4'>{item.totalPrice}</td>
                                        <td className='border border-gray-300 p-4'>
                                            {item.slip ? (
                                                <a href={`http://localhost:5555/uploads/slips/${item.slip}`} rel="noopener noreferrer" className='bg-green-500 text-white py-2 px-4 rounded ml-4 ' >View</a>
                                            ) : (
                                                <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, item._id)} />
                                            )}

                                        </td>
                                        <td className='border border-gray-300 p-4'>{item.status}</td>
                                        <td className='border border-gray-300 p-4'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/OrderPaymentsUpdate/${item._id}`} className='text-2xl text-yellow-600'>
                                                    <AiOutlineEdit />
                                                </Link>
                                                <button onClick={() => handleDeletePayment(item._id)} className='text-2xl text-red-600'>
                                                    <MdOutlineDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default OrderPayments;
