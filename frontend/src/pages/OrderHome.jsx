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
    const exactMatch = orders.filter(order => order.orderno === parseInt(searchInput));
    setFilteredOrders(exactMatch.length > 0 ? exactMatch : []);
  };
  const handleButtonOnClick = () => {
    try {
      const doc = new jsPDF();
      const tableData = orders.map(orders => [orders.orderno, orders.duedate, orders.quantity, orders.category]);

      doc.autoTable({
        head: [['Order id', 'Due date', 'Quantity', 'Category']],
        body: tableData,
      });

      doc.save('Order report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);

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
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/HomePage" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/OrderHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Order Management</Link>


          </div>
        </div>
      </nav>
      
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Orders List</h1>
          <Link to='/orders/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
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
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(searchInput === '' ? orders : filteredOrders).map((order, index) => (
                <tr key={order._id} className='h-8'>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.orderno}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.duedate}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.quantity}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{order.category}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex justify-left gap-x-6'>
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

      <Footer />

<ToastContainer position="bottom-right" />
</div>

  );
};

export default OrderHome;

