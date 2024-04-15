import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [wasteList, setWasteList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5555/waste')
      .then((response) => {
        setWasteList(response.data);
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
              <Link to="/iHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/inventorys" className="text-gray-300    hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
              
              
              <Link to="/waste-management" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
              
              <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
              <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending New Stocks</Link>
              <Link to="/isupplierrecord" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
              <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">More</Link>
            
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto p-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Waste List</h1>
          <Link to="/waste/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Waste
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-collapse border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-gray-300 p-4 text-left'>Waste ID</th>
                <th className='border border-gray-300 p-4 text-left'>batchid</th>
                <th className='border border-gray-300 p-4 text-left'>Tea Type</th>
                <th className='border border-gray-300 p-4 text-left'>Inventory Number</th>
                <th className='border border-gray-300 p-4'>Quantity</th>
                <th className='border border-gray-300 p-4'>Date Recorded</th>
                <th className='border border-gray-300 p-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {wasteList.map((item, index) => (
                <tr key={index} className='border border-gray-300'>
                  <td className='border border-gray-300 p-4'>{item.wasteid}</td>
                  <td className='border border-gray-300 p-4'>{item.batchid}</td>
                  <td className='border border-gray-300 p-4'>{item.teatype}</td>
                  <td className='border border-gray-300 p-4'>{item.inventorynumber}</td>
                  <td className='border border-gray-300 p-4'>{item.quantity}</td>
                  <td className='border border-gray-300 p-4'>{item.dateRecorded}</td>
                  <td className='border border-gray-300 p-4'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/waste/details/${item._id}`} className='text-2xl text-green-800'>
                        View
                      </Link>
                      <Link to={`/waste/edit/${item._id}`} className='text-2xl text-yellow-600'>
                        Edit
                      </Link>
                      <Link to={`/waste/delete/${item._id}`} className='text-2xl text-red-600'>
                        Delete
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