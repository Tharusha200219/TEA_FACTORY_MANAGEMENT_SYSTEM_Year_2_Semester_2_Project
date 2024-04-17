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
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeMobile, setEmployeeMobile] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeRoles, setEmployeeRoles] = useState('');
  const [createdOn, setCreatedOn] = useState(new Date());
  const [sendEmailChecked, setSendEmailChecked] = useState(false); // Added state for checkbox
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle saving the employee
  // Inside handleSaveEmployee function
const handleSaveEmployee = () => {
  if (!validateForm()) {
    return;
  }

  const data = {
    employeeName,
    employeeEmail,
    employeeMobile,
    employeeAddress,
    employeeRoles,
    createdOn: createdOn.getTime(), // Convert date to Unix timestamp
    sendEmailChecked, // Include the state of the checkbox
  };

  setLoading(true);
  axios
    .post('http://localhost:5555/employees', data)
    .then((response) => {
      setLoading(false);
      if (response.data.message.includes('email sent')) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message, { variant: 'success' });
      }
      navigate('/');
    })
    .catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error: Failed to add employee', { variant: 'error' });
      console.error('AxiosError:', error);
    });
};


  // Function to validate the form
  const validateForm = () => {
    if (!employeeName || !employeeEmail || !employeeMobile || !employeeAddress || !employeeRoles || !createdOn) {
      setIsValid(false);
      return false;
    }

    if (employeeName.trim() === '') {
      setIsValid(false);
      return false;
    }

    if (employeeMobile.length !== 10) {
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
            className={`form-input mt-2 block w-full border ${!isValid && !employeeName.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Email Address</label>
          <input
            type='text'
            placeholder='Enter Email address here '
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && !employeeEmail.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Mobile</label>
          <input
            type='text'
            placeholder='Enter Employee contact number'
            value={employeeMobile}
            onChange={(e) => setEmployeeMobile(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && employeeMobile.length !== 10 ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Address</label>
          <textarea
            placeholder='Enter Current Address...'
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && !employeeAddress.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Employee Role</label>
          <textarea
            placeholder='Enter Current employee roll...'
            value={employeeRoles}
            onChange={(e) => setEmployeeRoles(e.target.value)}
            className={`form-input mt-2 block w-full border ${!isValid && !employeeRoles.trim() ? 'border-red-500' : 'border-gray-300'} rounded-md px-4 py-2`}
          />
        </div>

        <div className='my-4'>
          <label className='block text-lg text-gray-700 mb-2 font-bold'>Created On</label>
          <DatePicker
            selected={createdOn}
            onChange={(date) => setCreatedOn(date)}
            className='form-input mt-2 block w-full border border-gray-300 rounded-md px-4 py-2'
          />
        </div>

        {/* Checkbox for sending email */}
        <div className='my-4'>
          <input
            type='checkbox'
            checked={sendEmailChecked}
            onChange={(e) => setSendEmailChecked(e.target.checked)}
            className='form-checkbox h-5 w-5 text-blue-600'
          />
          <span className='ml-2 text-lg text-gray-700'>Send welcome email</span>
        </div>

        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleSaveEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;
