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