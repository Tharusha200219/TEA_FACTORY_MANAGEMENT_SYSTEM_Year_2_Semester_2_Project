import React, { useState } from 'react';
import BackButtonForDepartment from '../components/BackButtonForDepartment';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const DeleteDepartment = ({ }) => { 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteDepartment = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/departments/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Department details Deleted Successfully', { variant: 'success'});
        navigate('/DepartmentHome'); // Inform parent component about deletion
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error'});
        console.log(error);
      });

  };

  return (
    <div className="flex flex-col h-screen">
    <NavigationBar />
    <div className='flex-grow'>
      <div className='p-4'>
        <BackButtonForDepartment/>
        <h1 className='text-3xl my-4 text-center'>Delete Department Details from the system</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
            <h3 className='text-2xl'>Are You Sure You want to delete this department details from the system</h3>
            <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteDepartment}> 
                yes, Delete it
            </button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  
  );
}

export default DeleteDepartment;
