import React, { useState } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import NavigationBar from '../components/NavigationBar'; // Import NavigationBar component

const Deleteteatypes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteteatypes = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/teatypes/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/Teatypehome');
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div><NavigationBar />
    {/* Navigation Bar */}
    <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
      <div className="container mx-auto">
        <div className=" mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/Teatypehome" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
            <Link to="/teatypes/creates" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
            <Link to="/pending-shipments" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
            <Link to="/TeaTypeReport" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
          </div>
        </div>
      </div>
    </nav>
    {/* End of Navigation Bar */}
    
    <div className='flex flex-col justify-center items-center h-screen' style={{ backgroundColor: 'white' }}>
      
      <div className='p-4'>
        <BackButtonForCreateProduction />
        <h1 className='text-3xl my-4'>Delete Tea Type</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 shadow-lg'>
          <h3 className='text-2xl'>Are you sure you want to delete this tea type schedule?</h3>
          <button
            onClick={handleDeleteteatypes}
            className='bg-red-500 text-white p-2 mt-4 rounded-md hover:bg-red-600 transition-all'
          >
            Delete It
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Deleteteatypes;
