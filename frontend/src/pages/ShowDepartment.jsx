import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';

const ShowDepartment = () => {
  const [department, setDepartment] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/departments/${id}`)
      .then((response) => {
        setDepartment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching department:', error);
        setLoading(false);
      });
  }, [id]);

  const renderDepartmentDetails = () => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-gray-200 rounded-lg p-6'>
          <Detail label="Department Name" value={department.departmentName} />
          <Detail label="Details" value={department.departmentDetails} />
          <Detail label="Created On" value={new Date(department.createdAt).toLocaleString()} />
          <Detail label="Status" value={department.departmentStatus} />
          <Detail label="Created At" value={new Date(department.createdAt).toLocaleString()} />
          <Detail label="Last Updated At" value={new Date(department.updatedAt).toLocaleString()} />
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
      <h1 className='text-3xl my-4'>Department Details</h1>
      {loading ? <Spinner /> : renderDepartmentDetails()}
    </div>
  );
};

export default ShowDepartment;
