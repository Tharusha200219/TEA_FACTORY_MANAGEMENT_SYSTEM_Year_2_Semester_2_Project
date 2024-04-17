import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';

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
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-gray-200 rounded-lg p-6'>
          <Detail label="Employee Name" value={employee.employeeName} />
          <Detail label="Employee Email" value={employee.employeeEmail} />
          <Detail label="Employee Mobile" value={employee.employeeMobile} />
          <Detail label="Employee Address" value={employee.employeeAddress} />
          <Detail label="Employee Role" value={employee.employeeRoles} />
          <Detail label="Created On" value={new Date(employee.createdAt).toLocaleString()} />
          <Detail label="Created At" value={new Date(employee.createdAt).toLocaleString()} />
          <Detail label="Last Updated At" value={new Date(employee.updatedAt).toLocaleString()} />
        </div>
      </div>
    );
  };

  const Detail = ({ label, value }) => {
    return (
      <div className='flex justify-between py-2'>
        <span className='text-gray-700'>{label}</span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <BackButton />
      <h1 className='text-3xl my-4'>Employee Details</h1>
      {loading ? <Spinner /> : renderEmployeeDetails()}
    </div>
  );
};




export default ShowEmployee;