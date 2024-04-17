import React, { useState, useEffect } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditInventory = () => {
  const [batchId, setBatchId] = useState('');
  const [category, setCategory] = useState('');
  const [inventoryNumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((response) => {
        setBatchId(response.data.batchid);
        setCategory(response.data.category);
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

  const handleEditInventory = () => {
    const data = {
      batchid: batchId,
      category: category,
      inventorynumber: inventoryNumber,
      quantity: quantity,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/inventory/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Inventorys');
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
        <h1 className='text-3xl mb-6 font-bold text-gray-800'>Edit Inventory</h1>

        {loading && <Spinner />}

        <div className='space-y-4'>
          <div className='mb-4'>
            <label htmlFor='batchId' className='text-lg text-gray-600'>Batch ID</label>
            <input
              id='batchId'
              type='text'
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='category' className='text-lg text-gray-600'>Category</label>
            <input
              id='category'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='input-field'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='inventoryNumber' className='text-lg text-gray-600'>Inventory Number</label>
            <input
              id='inventoryNumber'
              type='text'
              value={inventoryNumber}
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
            onClick={handleEditInventory}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;