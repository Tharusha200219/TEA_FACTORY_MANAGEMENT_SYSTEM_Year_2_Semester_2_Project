import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const OrderPaymentsCreate = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedOrderQuantity, setSelectedOrderQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

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

    const handleOrderChange = (e) => {
        const selectedOrderId = e.target.value;
        setSelectedOrder(selectedOrderId);
        // Find the selected order in the orders array
        const selectedOrder = orders.find(order => order._id === selectedOrderId);
        // Update the selected order's quantity
        setSelectedOrderQuantity(selectedOrder.quantity);
    };

    const handleSavePayment = () => {
        if (totalPrice<0) {
            alert('Price cannot be a minus');
            return;
        }
        const data = {
            order: selectedOrder,
            totalPrice: totalPrice // Include the totalPrice in the data object
        };
        setLoading(true);
        axios.post('http://localhost:5555/orderPayments', data)
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

    return (
        <div>

            <NavigationBar />
            <div className='p-4'>
                <h1 className='text-3xl my-4'>Add New Order Payment</h1>

                {loading && <Spinner />}

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
                        <label className='text-xl mr-4 text-gray-500'>Quantity</label>
                        <input
                            type="text"
                            value={selectedOrderQuantity}
                            className='border-2 border-gray-500 px-4 py-2 w-full' readOnly
                        />
                    </div>

                    <div className='p-4'>
                        <label className='text-xl mr-4 text-gray-500'>Enter the total Price for the quantity</label>
                        <input
                            type="number" min="1"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)} // Update the totalPrice state
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>

                    <button className='p-2 bg-sky-300 m-8' onClick={handleSavePayment}>
                        Save
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderPaymentsCreate;
