import React, { useState, useEffect } from 'react';
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
  const [batchIdError, setBatchIdError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const navigate = useNavigate();

  const categories = ['Green Tea', 'Black Tea', 'Oolong Tea', 'White Tea', 'BOPF'];
  const inventoryNumbers = ['1a', '1b', '1c', '2a', '2b', '2c'];

  const handleSaveInventory = () => {
    const data = {
      batchid,
      category,
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

  useEffect(() => {
    // Real-time validation for batchid
    const pattern = /^[A-Za-z0-9#]*$/;
    if (!pattern.test(batchid)) {
      setBatchIdError('Batch ID can only contain letters, numbers, and # sign');
    } else if (batchid.length > 10) {
      setBatchIdError('Batch ID must not exceed 10 characters');
    } else {
      setBatchIdError('');
    }
  }, [batchid]);

  useEffect(() => {
    // Real-time validation for quantity
    if (quantity.length > 6) {
      setQuantityError('Quantity must not exceed 6 digits');
    } else {
      setQuantityError('');
    }
  }, [quantity]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className=' text-3xl my-4'>Create Inventory</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-800 rounded-xl w-[600px] p-4 mx-auto'>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Batch ID</label>
          <input
            type="text"
            value={batchid}
            onChange={(e) => setBatchId(e.target.value)}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${batchIdError && 'border-red-500'}`}
          />
          {batchIdError && <div className="text-red-500">{batchIdError}</div>}
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Inventory Number</label>
          <select
            value={inventorynumber}
            onChange={(e) => setInventoryNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          >
            <option value="">Select Inventory Number</option>
            {inventoryNumbers.map((number, index) => (
              <option key={index} value={number}>{number}</option>
            ))}
          </select>
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={`border-2 border-gray-500 px-4 py-2 w-full ${quantityError && 'border-red-500'}`}
          />
          {quantityError && <div className="text-red-500">{quantityError}</div>}
        </div>

        <button className='p-2 bg-sky-800 m-8' onClick={handleSaveInventory}>
          Save
        </button>

      </div>
    </div>
  );
};

export default CreateInventory;
