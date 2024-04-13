import React, { useState } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreateDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState('');
  const [createdOn, setCreatedOn] = useState(new Date());
  const [departmentStatus, setDepartmentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveDepartment = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      departmentName,
      departmentDetails,
      createdOn: createdOn.getTime(), // Convert date to Unix timestamp
      departmentStatus,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/departments', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Department created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check console.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const validateForm = () => {
    if (!departmentName || !departmentDetails || !createdOn || !departmentStatus) {
      setIsValid(false);
      return false;
    }

    if (departmentName.trim() === '') {
      setIsValid(false);
      return false;
    }

    if (departmentDetails.length < 5 || departmentDetails.length > 150) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl my-4 text-center'>Create Department</h1>
      <BackButton />
      {loading && <Spinner />}
      <div className='max-w-md mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow'>
        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Department Name</label>
          <input
            type='text'
            placeholder='Enter department name'
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && !departmentName.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
          {!isValid && !departmentName.trim() && (
            <p className='text-red-500 text-sm mt-1'>Please enter a department name</p>
          )}
        </div>
        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Department Details</label>
          <textarea
            placeholder='Enter department details (5 to 150 characters)'
            value={departmentDetails}
            onChange={(e) => setDepartmentDetails(e.target.value)}
            className={`form-textarea mt-2 block w-full border ${!isValid && (departmentDetails.length < 5 || departmentDetails.length > 150) ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
          {!isValid && departmentDetails.length < 5 && (
            <p className='text-red-500 text-sm mt-1'>Department details must be at least 5 characters</p>
          )}
          {!isValid && departmentDetails.length > 150 && (
            <p className='text-red-500 text-sm mt-1'>Department details cannot exceed 150 characters</p>
          )}
        </div>
        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Created On</label>
          <DatePicker
            selected={createdOn}
            onChange={(date) => setCreatedOn(date)}
            className='form-input mt-2 block w-full border border-gray-300 rounded-md px-4 py-2'
          />
        </div>
        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Department Status</label>
          <div>
            <button
              className={`mr-4 px-4 py-2 rounded-md ${
                departmentStatus === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setDepartmentStatus('Active')}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                departmentStatus === 'Inactive' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setDepartmentStatus('Inactive')}
            >
              Inactive
            </button>
          </div>
          {!isValid && !departmentStatus && (
            <p className='text-red-500 text-sm mt-1'>Please select department status</p>
          )}
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleSaveDepartment}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateDepartment;
