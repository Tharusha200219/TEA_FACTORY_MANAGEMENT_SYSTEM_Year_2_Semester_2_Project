import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import BackButtonForCreateEmployee from '../components/BackbuttonForCreateEmployee';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const ShowEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee:', error);
        setLoading(false);
      });
  }, [id]);

  const renderEmployeeDetails = () => {
    return (
      <form className='bg-gray-200 rounded-lg p-6 w-full max-w-xl'>
        
          <FormField label="Employee Name" value={employee.employeeName} />
          <FormField label="Employee Email" value={employee.employeeEmail} />
          <FormField label="Employee Mobile" value={employee.employeeMobile} />
          <FormField label="Employee Address" value={employee.employeeAddress} />
          <FormField label="Employee Role" value={employee.employeeRoles} />
          <FormField label="Created On" value={new Date(employee.createdAt).toLocaleString()} />
          <FormField label="Created At" value={new Date(employee.createdAt).toLocaleString()} />
          <FormField label="Last Updated At" value={new Date(employee.updatedAt).toLocaleString()} />
        
      </form>
    );
  };

  const FormField = ({ label, value }) => {
    return (
      <div className='flex flex-col'>
        <label className='text-gray-700'>{label}</label>
        
        <input type="text" value={value} className='border border-gray-500 rounded-md px-3 py-2 mt-1' readOnly />
      </div>
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className='flex-grow'>
        <div className='p-4'>
        <BackButtonForCreateEmployee />
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-3xl my-4'>Employee Details</h1>
          {loading ? <Spinner /> : renderEmployeeDetails()}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowEmployee;
