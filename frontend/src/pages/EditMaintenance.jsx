import React, { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const EditMaintenance = () => {
  const [machineNumber, setmachineNumber] = useState('');
  const [machineName, setmachineName] = useState('');
  const [description, setdescription] = useState('');
  const [maintenanceDate, setmaintenanceDate] = useState('');
  const [frequencyInDays, setfrequencyInDays] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/maintenances/${id}`)
      .then((response) => {
        setmachineNumber(response.data.machineNumber);
        setmachineName(response.data.machineName);
        setdescription(response.data.description);
        setmaintenanceDate(response.data.maintenanceDate);
        setfrequencyInDays(response.data.frequencyInDays);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditMaintenance = () => {
    const data = {
      machineNumber,
      machineName,
      description,
      maintenanceDate,
      frequencyInDays,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/maintenances/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/MaintenanceHome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div> {/* Navigation Bar */}
        <NavigationBar />
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundColor: 'gray' }}>
      
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
        <h1 className='text-3xl mb-6 font-bold text-gray-800 text-center'>Edit Maintenance</h1>

        {loading && <Spinner />}

        <div className='space-y-4'>
          <div className='mb-4'>
            <label htmlFor='machineNumber' className='text-lg text-gray-600'>machineNumber No</label>
            <input
              id='machineNumber'
              type='number'
              value={machineNumber}
              onChange={(e) => setmachineNumber(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='machineName' className='text-lg text-gray-600'>machineName</label>
            <input
              id='machineName'
              type='text'
              value={machineName}
              onChange={(e) => setmachineName(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='description' className='text-lg text-gray-600'>description</label>
            <input
              id='description'
              type='text'
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='maintenanceDate' className='text-lg text-gray-600'>maintenanceDate</label>
            <input
              id='maintenanceDate'
              type='text'
              value={maintenanceDate}
              onChange={(e) => setmaintenanceDate(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='frequencyInDays' className='text-lg text-gray-600'>frequencyInDays</label>
            <input
              id='frequencyInDays'
              type='number'
              value={frequencyInDays}
              onChange={(e) => setfrequencyInDays(e.target.value)}
              className='input-field'
            />
          </div>

          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
            onClick={handleEditMaintenance}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditMaintenance;
