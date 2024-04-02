import React, { useState, useEffect } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Editteatypes = () => {
  const [Schedule_no, setSchedule_no] = useState('');
  const [black_tea, setblack_tea] = useState('');
  const [green_tea, setgreen_tea] = useState('');
  const [oolong_tea, setoolong_tea] = useState('');
  const [white_tea, setwhite_tea] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/teatypes/${id}`)
      .then((response) => {
        setSchedule_no(response.data.Schedule_no);
        setblack_tea(response.data.black_tea);
        setgreen_tea(response.data.green_tea);
        setoolong_tea(response.data.oolong_tea);
        setwhite_tea(response.data.white_tea);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditteatypes = () => {
    const data = {
      Schedule_no,
      black_tea,
      green_tea,
      oolong_tea,
      white_tea,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/teatypes/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Teatypehome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundColor: 'gray' }}>
      <BackButtonForCreateProduction />
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
        <h1 className='text-3xl mb-6 font-bold text-gray-800 text-center'>Edit Tea Type</h1>

        {loading && <Spinner />}

        <div className='space-y-4'>
          <div className='mb-4'>
            <label htmlFor='Schedule_no' className='text-lg text-gray-600'>Schedule No</label>
            <input
              id='Schedule_no'
              type='number'
              value={Schedule_no}
              onChange={(e) => setSchedule_no(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='black_tea' className='text-lg text-gray-600'>black_tea</label>
            <input
              id='black_tea'
              type='number'
              value={black_tea}
              onChange={(e) => setblack_tea(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='green_tea' className='text-lg text-gray-600'>green_tea</label>
            <input
              id='green_tea'
              type='number'
              value={green_tea}
              onChange={(e) => setgreen_tea(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='oolong_tea' className='text-lg text-gray-600'>oolong_tea</label>
            <input
              id='oolong_tea'
              type='number'
              value={oolong_tea}
              onChange={(e) => setoolong_tea(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='white_tea' className='text-lg text-gray-600'>white_tea</label>
            <input
              id='white_tea'
              type='number'
              value={white_tea}
              onChange={(e) => setwhite_tea(e.target.value)}
              className='input-field'
            />
          </div>

          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
            onClick={handleEditteatypes}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editteatypes;
