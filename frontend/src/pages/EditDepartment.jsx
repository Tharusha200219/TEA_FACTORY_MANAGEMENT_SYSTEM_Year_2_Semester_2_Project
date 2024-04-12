import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [departmentStatus, setDepartmentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/departments/${id}`)
      .then((response) => {
        const data = response.data;
        setDepartmentName(data.departmentName);
        setDepartmentDetails(data.departmentDetails);
        setCreatedOn(data.createdOn);
        setDepartmentStatus(data.departmentStatus);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error fetching department:', error);
      });
  }, [id]);

  const validateInputs = () => {
    const errors = {};
    if (!departmentName.trim()) {
      errors.departmentName = 'Department Name is required';
    }
    if (!departmentDetails.trim()) {
      errors.departmentDetails = 'Department Details are required';
    }
    if (!createdOn.trim()) {
      errors.createdOn = 'Created On is required';
    } else if (isNaN(createdOn)) {
      errors.createdOn = 'Created On must be a number';
    }
    if (!departmentStatus.trim()) {
      errors.departmentStatus = 'Department Status is required';
    }
    return errors;
  };

  const handleEditDepartment = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      departmentName,
      departmentDetails,
      createdOn,
      departmentStatus,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/departments/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Department details edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error editing department:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Department Details</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Department Name</label>
          <input
            type='text'
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.departmentName && <span className='text-red-500'>{errors.departmentName}</span>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Department Details</label>
          <input
            type='text'
            value={departmentDetails}
            onChange={(e) => setDepartmentDetails(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.departmentDetails && <span className='text-red-500'>{errors.departmentDetails}</span>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Created On</label>
          <input
            type='text'
            value={createdOn}
            onChange={(e) => setCreatedOn(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.createdOn && <span className='text-red-500'>{errors.createdOn}</span>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-700'>Department Status</label>
          <input
            type='text'
            value={departmentStatus}
            onChange={(e) => setDepartmentStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.departmentStatus && <span className='text-red-500'>{errors.departmentStatus}</span>}
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditDepartment}>Save</button>
      </div>
    </div>
  );
};

export default EditDepartment;
