import React, { useState } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CreateEmployee = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeMobile, setEmployeeMobile] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeRoles, setEmployeeRoles] = useState('');
  const [createdOn, setCreatedOn] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveEmployee = () => {
    if (!validateForm()) {
      return;
    }

    const data = {
      employeeName,
      employeeMobile,
      employeeAddress,
      employeeRoles,
      createdOn: createdOn.getTime(), // Convert date to Unix timestamp
      
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/employees', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee Added successfully', { variant: 'success' });
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
    if (!employeeName || !employeeMobile || !employeeAddress || !employeeRoles || !createdOn ) {
      setIsValid(false);
      return false;
    }

    if (employeeName.trim() === '') {
      setIsValid(false);
      return false;
    }

    if (employeeMobile.length == 10 ) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl my-4 text-center'>Add New Employee</h1>
      <BackButton />
      {loading && <Spinner />}
      <div className='max-w-md mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow'>
        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Name</label>
          <input
            type='text'
            placeholder='Enter employee name here '
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && !employeeName.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}/>
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Mobile</label>
          <textarea
            placeholder='Enter Employee contact number'
            value={employeeMobile}
            onChange={(e) => setEmployeeMobile(e.target.value)}/>
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Address</label>
          <textarea
            placeholder='Enter Current Address...'
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}/>
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Role</label>
          <textarea
            placeholder='Enter Current employee roll...'
            value={employeeRoles}
            onChange={(e) => setEmployeeRoles(e.target.value)}/>
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Created On</label>
          <DatePicker
            selected={createdOn}
            onChange={(date) => setCreatedOn(date)}
            className='form-input mt-2 block w-full border border-gray-300 rounded-md px-4 py-2'
          />
        </div>
        

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleSaveEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};




export default CreateEmployee;