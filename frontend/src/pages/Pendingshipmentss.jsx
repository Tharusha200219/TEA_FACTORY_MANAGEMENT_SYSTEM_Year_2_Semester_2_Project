import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import NavigationBar from '../components/NavigationBar';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import OrderSearchBar from '../components/OrderSearchBar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
 
 


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

  const handleSearch = (input) => {
    setSearchInput(input);
    const filtered = orders.filter(order => order.orderno.toString().includes(input));
    setFilteredOrders(filtered);
  };

  const handleButtonClick = () => {
    const trimmedInput = searchInput.trim();

    if (trimmedInput === '') {

      setFilteredOrders(orders);
    } else {
      const exactMatch = orders.filter(order => order.orderno.toString() === trimmedInput);
      setFilteredOrders(exactMatch);
    }

  };

  const handleButtonOnClick = () => {
    try {
      const doc = new jsPDF();
      const tableData = orders.map(orders => [orders.orderno, new Date(orders.duedate).toLocaleDateString('en-GB'), orders.quantity, orders.category,orders.status,orders.name,orders.address,orders.telephone]);

      doc.autoTable({
        head: [['Order id', 'Due date', 'Quantity', 'Category', 'Status','Name', 'Address', 'Telephone',]],
        body: tableData,
      });

      doc.save('Order report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);

    }
  };


  const handleSendStatusSent = async (orderId) => {
    try {

      const response = await axios.get(`http://localhost:5555/orders/${orderId}/status`);
      const currentStatus = response.data.status;
      if (currentStatus === 'Sent') {
        console.log('Order status is already "Sent"');
        return;
      }
      const updateResponse = await axios.put(`http://localhost:5555/orders/${orderId}/status`, { status: 'Sent' });
      console.log("Order status updated successfully:", updateResponse.data);
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: 'Sent' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {

      console.log("Error updating order status:", error);

    }
  };

  const handleSendStatusAccept = async (orderId, index) => {
    try {
      const response = await axios.get(`http://localhost:5555/orders/${orderId}/status`);
      const currentStatus = response.data.status;
      if (currentStatus === 'Accepted') {
        console.log('Order status is already "Accepted"');
        return;
      }
      const updateResponse = await axios.put(`http://localhost:5555/orders/${orderId}/status`, { status: 'Accepted' });
      console.log("Order status updated successfully:", updateResponse.data);
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: 'Accepted' };
        }
        return order;
      });
      setOrders(updatedOrders);
      
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };


  const handleSendStatusDeliver = async (orderId) => {
    try {

      const response = await axios.get(`http://localhost:5555/orders/${orderId}/status`);
      const currentStatus = response.data.status;
      if (currentStatus === 'Delivered') {
        console.log('Order status is already "Delivered"');
        return;
      }
      const updateResponse = await axios.put(`http://localhost:5555/orders/${orderId}/status`, { status: 'Delivered' });
      console.log("Order status updated successfully:", updateResponse.data);
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: 'Delivered' };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {

      console.log("Error updating order status:", error);

    }
  };


  useEffect(() => {
    if (searchInput === '') {
      setFilteredOrders([]);
    }
  }, [searchInput]);



  return (
    <div>
      <NavigationBar />
      <nav className="bg-green-500 p-4">
    <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
            <Link to="/HomePage" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/inventorys" className="text-white   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
            <Link to="/waste-management" className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
            <Link to="/Pendingshipmentss" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
            <Link to="/Irawleaves" className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
        
        </div>
    </div>
</nav>

      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Orders List</h1>
   
        </div>
        <div className='flex items-baseline justify-between'>
          <div style={{ flex: '1' }}>
            <OrderSearchBar
              searchInput={searchInput}
              setSearchInput={handleSearch}
              handleSearch={handleSearch}
              handleButtonClick={handleButtonClick}
            />
          </div>
          <button onClick={handleButtonOnClick} className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Report Generate</button>

        </div>
        {loading ? (
          <Spinner />
        ) : (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Order id</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Due date</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Category</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchInput === '' ? orders : filteredOrders).map((order, index) => (
                <tr key={order._id} className='h-8'>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.orderno}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{new Date(order.duedate).toLocaleDateString('en-GB')}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.quantity}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.category}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.status}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex justify-left gap-x-6'>
                      <button onClick={() => handleSendStatusAccept(order._id)} className='inline-flex items-center px-6 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 '>
                        Accept
                      </button>
         
          
              
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />

      <ToastContainer position="bottom-right" />
    </div>

  );
};

export default OrderHome;


