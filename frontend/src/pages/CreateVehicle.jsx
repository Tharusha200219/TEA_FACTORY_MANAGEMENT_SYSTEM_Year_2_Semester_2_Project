import React, { useState } from 'react';
import BackButton from '../components/BackButtonVehicle';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateVehicle = () => {
  const [type, setType] = useState('');
  const [regnum, setRegnum] = useState('');
  const [maxkgs, setMaxkgs] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveVehicle = () => {
    const data = {
      type,
      regnum,
      maxkgs: parseInt(maxkgs),
      date,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/vehicles', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle Created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add New Vehicle</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Type</label>
          <input
            type='text'
value={type}
            onChange={(e) => setType(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Reg Num</label>
          <input
            type='text'
            value={regnum}
            onChange={(e) => setRegnum(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Max Kgs</label>
          <input
            type='number'
            value={maxkgs}
            onChange={(e) => setMaxkgs(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveVehicle}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateVehicle