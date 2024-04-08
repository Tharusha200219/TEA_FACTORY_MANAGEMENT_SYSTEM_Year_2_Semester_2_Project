import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMachine = () => {
  const [machineNumber, setMachineNumber] = useState('');
  const [machineName, setMachineName] = useState('');
  const [machineType, setMachineType] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [warrantyInformation, setWarrantyInformation] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/machines/${id}`)
      .then((response) => {
        const machineData = response.data;
        setMachineNumber(machineData.machineNumber || '');
        setMachineName(machineData.machineName || '');
        setMachineType(machineData.machineType || '');
        setInstallationDate(formatDate(machineData.installationDate) || '');
        setWarrantyInformation(machineData.warrentyInformation || ''); // Changed to warrentyInformation
        setStatus(machineData.Status || '');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching machine:', error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleEditMachine = async (e) => {
    e.preventDefault();
    const data = {
      machineNumber,
      machineName,
      machineType,
      installationDate,
      warrentyInformation: warrantyInformation, // Changed to warrentyInformation
      Status: status,
    };
    console.log('Data being sent:', data);
    try {
      setLoading(true);
      await axios.put(`http://localhost:5555/machines/${id}`, data);
      setLoading(false);
      navigate('/MachineHome');
    } catch (error) {
      setLoading(false);
      console.error('Error editing machine:', error.response);
      alert('An error occurred. Please check the console.');
    }
  };

  return (
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
              onChange={(e) => setMachineNumber(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='machineName' className='text-lg text-gray-600'>Machine Name</label>
            <input
              id='machineName'
              type='text'
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='machineType' className='text-lg text-gray-600'>Machine Type</label>
            <input
              id='machineType'
              type='text'
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='installationDate' className='text-lg text-gray-600'>Installation Date</label>
            <input
              id='installationDate'
              type='date'
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='warrantyInformation' className='text-lg text-gray-600'>Warranty Information</label>
            <input
              id='warrantyInformation'
              type='text'
              value={warrantyInformation}
              onChange={(e) => setWarrantyInformation(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='status' className='text-lg text-gray-600'>Status</label>
            <input
              id='status'
              type='text'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
  );
};

export default EditMachine;
