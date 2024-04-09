import React, { useState } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Deleteproductions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteproductions = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/productions/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/Productionhome');
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen' style={{ backgroundColor: 'white' }}>
      <div className='p-4'>
        <BackButtonForCreateProduction />
        <h1 className='text-3xl my-4'>Delete production schedule</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 shadow-lg'>
          <h3 className='text-2xl'>Are you sure you want to delete this production schedule?</h3>
          <button
            onClick={handleDeleteproductions}
            className='bg-red-500 text-white p-2 mt-4 rounded-md hover:bg-red-600 transition-all'
          >
            Delete It
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deleteproductions;
