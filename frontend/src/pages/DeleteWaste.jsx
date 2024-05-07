import React, { useState } from 'react';
import BackButton from '../components/backbuttonwaste';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const WasteDelete = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteWaste = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/waste/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/waste-management'); // Redirect to Waste Management page after deletion
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Waste</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto shadow-lg'>
        <h3 className='text-2xl'>Are you sure you want to delete this waste entry?</h3>
        <button
          onClick={handleDeleteWaste}
          className='bg-red-500 text-white p-2 mt-4 rounded-md hover:bg-red-600 transition-all'
        >
          Delete It
        </button>
      </div>
    </div>
  );
};

export default WasteDelete;