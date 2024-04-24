import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButtonForCreateEmployee from '../components/BackbuttonForCreateEmployee';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/employees/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee profile deleted successfully', { variant: 'success' });
        navigate('/EmployeeHome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting employee profile', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className='flex-grow'>
        <div className='p-4'>
          <BackButtonForCreateEmployee />
          <h1 className='text-3xl my-4 text-center'>Delete Employee Profile</h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col items-center border border-gray-300 rounded-lg p-8 mx-auto max-w-md'>
            <h3 className='text-2xl mb-6'>Are you sure you want to delete this profile?</h3>
            <div className='flex justify-between w-full'>
              <button
                className='p-4 bg-red-600 text-white w-1/2 mr-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                onClick={handleDeleteEmployee}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete it'}
              </button>
              <Link
                to='/EmployeeHome'
                className='p-4 bg-gray-200 text-gray-700 w-1/2 ml-2 rounded-md flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DeleteEmployee;
