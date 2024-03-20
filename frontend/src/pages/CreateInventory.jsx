import React, { useState } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInventory = () => {
  const [batchid, setBatchId] = useState('');
  const [category, setCategory] = useState('');
  const [inventorynumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveInventory = () => {
    const data = {
      batchid,
      catogory: category, // Corrected typo
      inventorynumber,
      quantity,
    };
    setLoading(true);
    axios.post('http://localhost:5555/inventory', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        alert('An error occurred');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className=' text-3xl my-4'>Create Inventory</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Batch ID</label>
          <input
            type="text"
            value={batchid}
            onChange={(e) => setBatchId(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Inventory Number</label>
          <input
            type="text"
            value={inventorynumber}
            onChange={(e) => setInventoryNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveInventory}>
          Save
        </button>

      </div>
    </div>
  );
};

export default CreateInventory;