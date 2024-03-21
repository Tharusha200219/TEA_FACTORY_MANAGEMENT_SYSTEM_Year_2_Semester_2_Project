import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';


const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:5555/orders`)
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });

  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-bold">
              Ever Green Tea
            </div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/OrderHome" className="text-gray-300  bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Order Management</Link>
              <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
              <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending New Stocks</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Order List</h1>
          <Link to='/CreateOrder'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-separate border-spacing-2'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-slate-600 rounded-md'>Order id</th>
                <th className='border border-slate-600 rounded-md'>Order no</th>
                <th className='border border-slate-600 rounded-md'>Due date</th>
                <th className='border border-slate-600 rounded-md'>Quantity</th>
                <th className='border border-slate-600 rounded-md'>Category</th>

              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{order.orderno}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{order.duedate}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{order.quantity}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{order.category}</td>
                  <td className='border border-slate-700 rounded-md text-center'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/orders/details/${order._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/orders/edit/${order._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-800' />
                      </Link>
                      <Link to={`/orders/delete/${order._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
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
      <footer className="bg-gray-800 text-white py-4 mt-8">
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
};

export default OrderHome;