import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButtonSupplyRecords from '../components/backbtnSupplyRecordTable';

const DeleteSupplyRecord = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteSupplyRecord = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/supplyrecords/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/SupplyRecordTable');
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className='mt-10 mx-3'>
      <div className='m-5'>
         <BackButtonSupplyRecords/>
      </div>
      <div className='p-30'>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto shadow-lg mt-8'>
      <h1 className='text-3xl font-bold text-center my-4'>Delete Record</h1>
        <h3 className='text-2xl mt-8'>Are you sure you want to delete this Record?</h3>
        <button
          onClick={handleDeleteSupplyRecord}
          className='bg-red-500 text-white p-2 mt-4 rounded-md hover:bg-red-600 transition-all'
        >
        Confirm
        </button>
      </div>
    </div>
    </div>
  );
};

export default DeleteSupplyRecord;