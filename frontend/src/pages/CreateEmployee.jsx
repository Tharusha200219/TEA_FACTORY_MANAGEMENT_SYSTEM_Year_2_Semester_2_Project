import React, { useState } from 'react';
import BackButtonForCreateEmployee from '../components/BackbuttonForCreateEmployee';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const CreateEmployee = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeMobile, setEmployeeMobile] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [employeeRole, setEmployeeRole] = useState('');
  const [createdOn, setCreatedOn] = useState(new Date());
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveEmployee = async () => { // Mark the function as async
    if (!validateForm()) {
      return;
    }

    const formData = new FormData(); // Create a FormData object

    formData.append('employeeName', employeeName);
    formData.append('employeeEmail', employeeEmail);
    formData.append('employeeMobile', employeeMobile);
    formData.append('employeeAddress', employeeAddress);
    formData.append('employeeRole', employeeRole);
    formData.append('createdOn', createdOn.getTime());
    formData.append('password', password); // Append the password to the FormData
    formData.append('image', image); // Append the image to the FormData

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5555/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      console.log('Response:', response.data);
      setLoading(false);
      enqueueSnackbar(response.data.message, { variant: 'success' });
      navigate('/EmployeeHome');
    } catch (error) {
      console.error('AxiosError:', error);
      setLoading(false);
      enqueueSnackbar('Error: Failed to add employee', { variant: 'error' });
    }
  };

  const validateForm = () => {
    setIsValid(true);

    if (!employeeName || !employeeEmail || !employeeMobile || !employeeAddress || !employeeRole || !createdOn || !password) {
      setIsValid(false);
      return false;
    }

    if (employeeName.trim() === '' || /\d/.test(employeeName) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeName)) {
      setIsValid(false);
      return false;
    }

    if (!/^[a-zA-Z\s]*$/.test(employeeAddress) || /\d/.test(employeeAddress) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeAddress)) {
      setIsValid(false);
      return false;
    }

    if (!/^[a-zA-Z\s]*$/.test(employeeRole) || /\d/.test(employeeRole) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeRole)) {
      setIsValid(false);
      return false;
    }

    if (employeeMobile.length !== 10 || isNaN(employeeMobile)) {
      setIsValid(false);
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(employeeEmail.toLowerCase())) {
      setIsValid(false);
      return false;
    }

    setIsValid(true);
    return true;
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <BackButtonForCreateEmployee />
          <h1 className="text-3xl my-4 text-center">Add New Employee</h1>

          {loading && <Spinner />}
          

          <div className="max-w-md mx-auto bg-white rounded-xl p-8 border border-gray-200 shadow">
            
            {/* Image upload field */}
            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Employee Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])} // Update the image state when a file is selected
                className={`form-input mt-2 block w-full border ${
                  !isValid && !image ? 'border-red-500' : 'border-gray-300'
                } rounded-md px-4 py-2`}
              />
              {!isValid && !image && <p className="text-red-500 text-sm mt-1">Please select an image</p>}
            </div>
            {/* End of image upload field */}


            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Employee Name</label>
              <input
                type="text"
                placeholder="Enter employee name here "
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                className={`form-input mt-2 block w-full border ${!isValid && (!employeeName.trim() || /\d/.test(employeeName) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeName)) ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-2 py-2`}
              />
              {!isValid && (!employeeName.trim() || /\d/.test(employeeName) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeName)) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid employee name</p>
              )}
            </div>

            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Email Address</label>
              <input
                type="text"
                placeholder="Enter Email address here "
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                className={`form-input mt-2 block w-full border ${!isValid && (!employeeEmail.trim() || !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(employeeEmail.toLowerCase())) ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              />
              {!isValid && (!employeeEmail.trim() || !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(employeeEmail.toLowerCase())) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
              )}
            </div>

            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Employee Mobile</label>
              <input
                type="text"
                placeholder="Enter Employee contact number"
                value={employeeMobile}
                onChange={(e) => setEmployeeMobile(e.target.value)}
                className={`form-input mt-2 block w-full border ${!isValid && (employeeMobile.length !== 10 || isNaN(employeeMobile)) ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              />
              {!isValid && (employeeMobile.length !== 10 || isNaN(employeeMobile)) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number</p>
              )}
            </div>

            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Address</label>
              <textarea
                placeholder="Enter Current Address..."
                value={employeeAddress}
                onChange={(e) => setEmployeeAddress(e.target.value)}
                className={`form-input mt-2 block w-full border ${!isValid && (!employeeAddress.trim() || !/^[a-zA-Z\s]*$/.test(employeeAddress) || /\d/.test(employeeAddress) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeAddress)) ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              />
              {!isValid && (!employeeAddress.trim() || !/^[a-zA-Z\s]*$/.test(employeeAddress) || /\d/.test(employeeAddress) || /[!@#$%^&*(),.?":{}|<>]/.test(employeeAddress)) && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid address</p>
              )}
            </div>

            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Employee Role</label>
              <select
                value={employeeRole}
                onChange={(e) => setEmployeeRole(e.target.value)}
                className={`form-select mt-2 block w-full border ${!isValid && !employeeRole ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              >
                <option value="">Select Role</option>
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
              {!isValid && !employeeRole && (
                <p className="text-red-500 text-sm mt-1">Please select an employee role</p>
              )}
            </div>

            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Created On</label>
              <DatePicker
                selected={createdOn}
                onChange={(date) => setCreatedOn(date)}
                className={`form-input mt-2 block w-full border ${!isValid && !createdOn ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              />
              {!isValid && !createdOn && (
                <p className="text-red-500 text-sm mt-1">Please select a valid date</p>
              )}
            </div>

            {/* Password input field */}
            <div className="my-4">
              <label className="block text-lg text-gray-700 mb-2 font-bold">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-input mt-2 block w-full border ${!isValid && !password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2`}
              />
              {!isValid && !password && (
                <p className="text-red-500 text-sm mt-1">Please enter a password</p>
              )}
            </div>
            {/* End of password input field */}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSaveEmployee}>
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};



export default CreateEmployee;
