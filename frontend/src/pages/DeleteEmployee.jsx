import React, { useState } from 'react';
import BackButton from '../components/backbutton';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/employees/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee profile Deleted Successfully', { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error'});
        console.log(error);
      });

  };


  return (
    <div className='p-4'>
      <backButton/>
      <h1 className='text-3xl my-4'>Delete Employee Profile from the system</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2x1'>Are You Sure You want to delete this Profile from the system</h3>
          <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteEmployee}> 
              yes, Delete it
          </button>
      </div>
    </div>
  )
}


export default DeleteEmployee