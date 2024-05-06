import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButtonForCreateEmployee from '../components/BackbuttonForCreateEmployee';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeMobile, setEmployeeMobile] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeRoles, setEmployeeRoles] = useState('');
  const [createdOn, setCreatedOn] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        const data = response.data;
        setEmployee(data);
        setEmployeeName(data.employeeName);
        setEmployeeEmail(data.employeeEmail);
        setEmployeeMobile(data.employeeMobile);
        setEmployeeAddress(data.employeeAddress);
        setEmployeeRoles(data.employeeRoles);
        setCreatedOn(new Date(data.createdOn)); // Convert Unix timestamp to Date object
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error fetching employee:', error);
      });
  }, [id]);

  const validateInputs = () => {
    const errors = {};
    if (!employeeName.trim()) {
      errors.employeeName = 'Employee Name is required';
    }
    if (!employeeEmail.trim()) {
      errors.employeeEmail = 'Employee Email Address is required';
    }
    if (!employeeMobile) {
      errors.employeeMobile = 'Employee mobile number is required';
    }
    if (!employeeAddress.trim()) {
      errors.employeeAddress = 'Employee Address is required';
    }
    if (!employeeRoles.trim()) {
      errors.employeeRoles = 'Employee role is required';
    }
    if (!createdOn) {
      errors.createdOn = 'Created On is required';
    }
    return errors;
  };

  const handleEditEmployee = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      employeeName,
      employeeEmail,
      employeeMobile,
      employeeAddress,
      employeeRoles,
      createdOn: createdOn.getTime(), // Convert Date object to Unix timestamp
    };
    setLoading(true);
    axios.put(`http://localhost:5555/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Details edited successfully', { variant: 'success' });
        navigate('/EmployeeHome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error editing employee:', error);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className='flex-grow'>
        <div className='p-4'>
          <BackButtonForCreateEmployee />
          <h1 className='text-3xl my-4 text-center'>Edit Employee Details</h1>
          {loading ? <Spinner /> : ''}
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

            <div className='my-4'>
              
              {employee && employee.image && (
                <img src={`http://localhost:5555/${employee.image}`} alt='Employee Image' className='block mx-auto h-20 w-20 rounded-full' />
              )}
            </div>


            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Employee Name</label>
              <input
                type='text'
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.employeeName ? 'border-red-500' : ''}`}
              />
              {errors.employeeName && <span className='text-red-500'>{errors.employeeName}</span>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Email Address</label>
              <input
                type='text'
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.employeeEmail ? 'border-red-500' : ''}`}
              />
              {errors.employeeEmail && <span className='text-red-500'>{errors.employeeEmail}</span>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Contact Number</label>
              <input
                type='Number'
                value={employeeMobile}
                onChange={(e) => setEmployeeMobile(e.target.value)}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.employeeMobile ? 'border-red-500' : ''}`}
              />
              {errors.employeeMobile && <span className='text-red-500'>{errors.employeeMobile}</span>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Address</label>
              <input
                type='text'
                value={employeeAddress}
                onChange={(e) => setEmployeeAddress(e.target.value)}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.employeeAddress ? 'border-red-500' : ''}`}
              />
              {errors.employeeAddress && <span className='text-red-500'>{errors.employeeAddress}</span>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Employee Role</label>
              <select
                value={employeeRoles}
                onChange={(e) => setEmployeeRoles(e.target.value)}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.employeeRoles ? 'border-red-500' : ''}`}
              >
                <option value="EmployeeMangeAdmin">Employee-Mange Admin</option>
                <option value="InventryManager">Inventry Manager</option>
                <option value="VehicleManager">Vehicle Manager</option>
                <option value="ProductionManager">Production Manager</option>
                <option value="PaymentManager">Payment Manager</option>
                <option value="SupplierManager">Supplier Manager</option>
                <option value="OrderManager">Order Manager</option>
                <option value="MaintainceManager">Maintaince Manager</option>
                <option value="Staff">Staff</option>
                <option value="Other">Other</option>
              </select>
              {errors.employeeRoles && <span className='text-red-500'>{errors.employeeRoles}</span>}
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-700'>Created On</label>
              <input
                type='date'
                value={createdOn.toISOString().split('T')[0]} // Format date as YYYY-MM-DD
                onChange={(e) => setCreatedOn(new Date(e.target.value))}
                className={`border-2 border-gray-500 px-4 py-2 w-full ${errors.createdOn ? 'border-red-500' : ''}`}
              />
              {errors.createdOn && <span className='text-red-500'>{errors.createdOn}</span>}
            </div>

            <button className='p-2 bg-sky-300 m-8' onClick={handleEditEmployee}>Save</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditEmployee;