import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButtonForDepartment from '../components/BackButtonForDepartment';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

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

    // Validate Department Name
    if (!departmentName.trim()) {
      errors.departmentName = 'Department Name is required';
    } else if (!/^[a-zA-Z\s]*$/.test(departmentName)) {
      errors.departmentName = 'Please enter valid value';
    }

    // Validate Department Details
    if (!departmentDetails.trim()) {
      errors.departmentDetails = 'Department Details are required';
    } else if (departmentDetails.trim().length < 5 || !/^[a-zA-Z\s]*$/.test(departmentDetails)) {
      errors.departmentDetails = 'Please enter valid value';
    }

    if (!createdOn) {
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

        // Redirect to DepartmentHome component
        navigate('/DepartmentHome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error editing department:', error);
      });
  };



  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className='flex-grow'>


        <div className='p-4'>
          <BackButtonForDepartment />
          <h1 className='text-3xl my-4 text-center'>Edit Department Details</h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700 font-bold'>Department Name</label>
              <input
                type='text'
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className='border-2 border-gray-300 px-4 py-2 w-full'
              />
              {errors.departmentName && <span className='text-red-500'>{errors.departmentName}</span>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700 font-bold'>Department Details</label>
              <input
                type='text'
                value={departmentDetails}
                onChange={(e) => setDepartmentDetails(e.target.value)}
                className='border-2 border-gray-300 px-4 py-2 w-full'
              />
              {errors.departmentDetails && <span className='text-red-500'>{errors.departmentDetails}</span>}
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700 font-bold'>Created On</label>
              <input
                type='text'
                value={createdOn}
                onChange={(e) => setCreatedOn(e.target.value)}
                className='border-2 border-gray-300 px-4 py-2 w-full'
              />
              {errors.createdOn && <span className='text-red-500'>{errors.createdOn}</span>}
            </div>


            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700 font-bold'>Department Status</label>
              <div>
                <br></br>
                <button
                  className={`mr-4 px-4 py-2 rounded-md ${departmentStatus === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setDepartmentStatus('Active')}
                >
                  Active
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${departmentStatus === 'Inactive' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => setDepartmentStatus('Inactive')}
                >
                  Inactive
                </button>
              </div>
              {!departmentStatus && (
                <p className='text-red-500 text-sm mt-1'>Please select department status</p>
              )}
            </div>



            <button className='p-2 bg-sky-300 m-8' onClick={handleEditDepartment}>Save</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditDepartment;
