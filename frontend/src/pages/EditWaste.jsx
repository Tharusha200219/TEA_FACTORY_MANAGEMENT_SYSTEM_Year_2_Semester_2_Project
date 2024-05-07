import React, { useState, useEffect } from 'react';
import BackButton from '../components/backbuttonwaste';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditWaste = () => {
  const [wasteid, setWasteId] = useState('');
  const [teatype, setTeaType] = useState('');
  const [inventorynumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/waste/${id}`)
      .then((response) => {
        setWasteId(response.data.wasteid);
        setTeaType(response.data.teatype);
        setInventoryNumber(response.data.inventorynumber);
        setQuantity(response.data.quantity);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditWaste = () => {
    const data = {
      wasteid,
      teatype,
      inventorynumber,
      quantity,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/waste/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/waste-management');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-3xl mb-6 font-bold text-gray-800'>Edit Waste</h1>

        {loading && <Spinner />}

        <div className='space-y-4'>
          <div className='mb-4'>
            <label htmlFor='wasteId' className='text-lg text-gray-600'>Waste ID</label>
            <input
              id='wasteId'
              type='text'
              value={wasteid}
              onChange={(e) => setWasteId(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='teaType' className='text-lg text-gray-600'>Tea Type</label>
            <input
              id='teaType'
              type='text'
              value={teatype}
              onChange={(e) => setTeaType(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='inventoryNumber' className='text-lg text-gray-600'>Inventory Number</label>
            <input
              id='inventoryNumber'
              type='text'
              value={inventorynumber}
              onChange={(e) => setInventoryNumber(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='quantity' className='text-lg text-gray-600'>Quantity</label>
            <input
              id='quantity'
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='input-field'
            />
          </div>

          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'
            onClick={handleEditWaste}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWaste;