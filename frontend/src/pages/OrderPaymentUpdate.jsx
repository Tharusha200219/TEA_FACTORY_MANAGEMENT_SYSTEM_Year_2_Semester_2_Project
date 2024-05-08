import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const OrderPaymentsUpdate = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPayment();
        fetchOrders();
    }, []);

    const fetchPayment = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5555/orderPayments/${id}`);
            setPayment(response.data);
            setSelectedOrder(response.data.order._id);
            setTotalPrice(response.data.totalPrice);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payment:', error);
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5555/orders');
            setOrders(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpdatePayment = () => {
        const formData = new FormData();
        formData.append('order', selectedOrder);
        formData.append('totalPrice', totalPrice);
        if (file) {
            formData.append('slip', file);
        }
        setLoading(true);
        axios.put(`http://localhost:5555/orderPayments/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                setLoading(false);
                navigate('/orderPayments');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
                setLoading(false);
            });
    };

    const handleOrderChange = (e) => {
        const selectedOrderId = e.target.value;
        setSelectedOrder(selectedOrderId);
    };

    return (
        <div>
        <NavigationBar />
            <div className='p-4'>
                <h1 className='text-3xl my-4'>Update Order Payment</h1>

                {loading && <Spinner />}

                {payment && (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                        <div className='p-4'>
                            <label className='text-xl mr-4 text-gray-500'>Select Order</label>
                            <select
                                value={selectedOrder}
                                onChange={handleOrderChange}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            >
                                <option value="">Select Order</option>
                                {orders.map((order) => (
                                    <option key={order._id} value={order._id}>
                                        {order.orderno}- {order.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='p-4'>
                            <label className='text-xl mr-4 text-gray-500'>Total Price</label>
                            <input
                                type="number"
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(e.target.value)}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            />
                        </div>

                        {payment.slip && (
                            <div className='p-4'>
                                <label className='text-xl mr-4 text-gray-500'>Update Slip (PDF)</label>
                                <p>Current File: {payment.slip}</p>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    className='border-2 border-gray-500 px-4 py-2 w-full'
                                />
                            </div>
                        )}

                        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdatePayment}>
                            Update
                        </button>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default OrderPaymentsUpdate;
