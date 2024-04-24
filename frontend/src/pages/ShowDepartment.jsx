import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButtonForDepartment from '../components/BackButtonForDepartment';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

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
      <form className='bg-gray-200 rounded-lg p-6 w-full max-w-xl'>
        <FormField label= "Department Name" value={department.departmentName} />
        <FormField label="Details" value={department.departmentDetails} />
        <FormField label="Created On" value={new Date(department.createdAt).toLocaleString()} />
        <FormField label="Status" value={department.departmentStatus} />
        <FormField label="Created At" value={new Date(department.createdAt).toLocaleString()} />
        <FormField label="Last Updated At" value={new Date(department.updatedAt).toLocaleString()} />
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
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className='flex-grow'>
        <div className='p-4'>
          <BackButtonForDepartment />
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl my-4'>Department Details</h1>
            {loading ? <Spinner /> : renderDepartmentDetails()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowDepartment;
