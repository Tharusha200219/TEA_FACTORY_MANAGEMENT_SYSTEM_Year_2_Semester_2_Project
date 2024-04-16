import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5555/inventory')
      .then((response) => {
        setInventory(response.data);
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
              <Link to="/HomePage" className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/inventorys" className="text-gray-300   bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
              
              
              <Link to="/waste-management" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
              
              <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
              <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending New Stocks</Link>
              <Link to="/Irawleaves" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
             
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto p-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Inventory List</h1>
          <Link
            to='/inventory/creates'
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all flex items-center'
          >
            <MdOutlineAddBox className='text-xl mr-2' />
            Add Inventory
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-collapse border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-gray-300 p-4 text-left'>No</th>
                <th className='border border-gray-300 p-4 text-left'>Batch ID</th>
                <th className='border border-gray-300 p-4 text-left'>Category</th>
                <th className='border border-gray-300 p-4'>Inventory Number</th>
                <th className='border border-gray-300 p-4'>Quantity</th>
                <th className='border border-gray-300 p-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={item._id} className='border border-gray-300'>
                  <td className='border border-gray-300 p-4'>{index + 1}</td>
                  <td className='border border-gray-300 p-4'>{item.batchid}</td>
                  <td className='border border-gray-300 p-4'>{item.category}</td>
                  <td className='border border-gray-300 p-4'>{item.inventorynumber}</td>
                  <td className='border border-gray-300 p-4'>{item.quantity}</td>
                  <td className='border border-gray-300 p-4'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/inventory/details/${item._id}`} className='text-2xl text-green-800'>
                        <BsInfoCircle />
                      </Link>
                      <Link to={`/inventory/edit/${item._id}`} className='text-2xl text-yellow-600'>
                        <AiOutlineEdit />
                      </Link>
                      <Link to={`/inventory/delete/${item._id}`} className='text-2xl text-red-600'>
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

export default Home;  