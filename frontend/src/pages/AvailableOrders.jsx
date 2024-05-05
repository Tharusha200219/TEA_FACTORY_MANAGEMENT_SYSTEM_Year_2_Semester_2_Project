import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

import NavigationBar from '../components/NavigationBar';

const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/orders`)
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (input) => {
    setSearchInput(input);
    const filtered = orders.filter((order) =>
      order.orderno.toString().includes(input)
    );
    setFilteredOrders(filtered);
  };

  const handleSetButtonClick = (order) => {
    navigate('/DeliveryOrder',
      {
        state:
          { order: order }
      });
  };

  useEffect(() => {
    if (searchInput === '') {
      setFilteredOrders([]);
    }
  }, [searchInput]);

  const pendingOrders = orders.filter((order) => order.status === 'Pending');

  return (
    <div>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link
              to="/HomePage"
              className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/TrackVehicle"
              className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Order Tracking
            </Link>
          </div>
        </div>
      </nav>

      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Orders List</h1>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Order id</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Category</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Delivery Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {(searchInput === '' ? pendingOrders : filteredOrders).map((order, index) => (
                <tr key={order._id} className='h-8'>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.orderno}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.quantity}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.category}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.status}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <button onClick={() => handleSetButtonClick(order)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Set
                    </button>
                  </td>
                </tr> 
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AvailableOrders;