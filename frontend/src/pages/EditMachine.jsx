import React, { useState, useEffect } from 'react';

import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const EditMachine = () => {
  const [machineNumber, setmachineNumber] = useState('');
  const [machineName, setmachineName] = useState('');
  const [machineType, setmachineType] = useState('');
  const [installationDate, setinstallationDate] = useState('');
  const [warrentyInformation, setwarrentyInformation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/machines/${id}`)
      .then((response) => {
        setmachineNumber(response.data.machineNumber);
        setmachineName(response.data.machineName);
        setmachineType(response.data.machineType);
        setinstallationDate(response.data.installationDate);
        setwarrentyInformation(response.data.warrentyInformation);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditMachine = () => {
    const data = {
      machineNumber,
      machineName,
      machineType,
      installationDate,
      warrentyInformation,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/machines/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/MachineHome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div>
       <NavigationBar />
       
       
    <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundColor: 'gray' }}>
      
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
        <h1 className='text-3xl mb-6 font-bold text-gray-800 text-center'>Edit Machine</h1>

        {loading && <Spinner />}

        <div className='space-y-4'>
          <div className='mb-4'>
            <label htmlFor='machineNumber' className='text-lg text-gray-600'>Machine Number</label>
            <input
              id='machineNumber'
              type='number'
              value={machineNumber}
              onChange={(e) => setmachineNumber(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='machineName' className='text-lg text-gray-600'>Machine Name</label>
            <input
              id='machineName'
              type='text'
              value={machineName}
              onChange={(e) => setmachineName(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='machineType' className='text-lg text-gray-600'>Machine Type</label>
            <input
              id='machineType'
              type='text'
              value={machineType}
              onChange={(e) => setmachineType(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='installationDate' className='text-lg text-gray-600'>Installation Date</label>
            <input
              id='installationDate'
              type='text'
              value={installationDate}
              onChange={(e) => setinstallationDate(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='warrentyInformation' className='text-lg text-gray-600'>Warrenty Information</label>
            <input
              id='warrentyInformation'
              type='text'
              value={warrentyInformation}
              onChange={(e) => setwarrentyInformation(e.target.value)}
              className='input-field'
            />
          </div>

          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
            onClick={handleEditMachine}
          >
            Save
          </button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditMachine;
