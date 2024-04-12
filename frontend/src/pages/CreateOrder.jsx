import React, { useState } from 'react';
import BackButtonOrder from '../components/backbuttonOrder';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateOrder = () => {
  const [orderno, setOrderNo] = useState('');
  const [duedate, setDuedate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const handleSaveOrder = () => {
    const data = {
      orderno,
      duedate, 
      quantity,
      category,
    };
    setLoading(true);
    axios.post(`http://localhost:5555/orders`, data)
      .then(() => {
        setLoading(false);
        navigate('/OrderHome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButtonOrder />
      <h1 className=' text-3xl my-4'>Create Order</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

        
        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Order No</label>
          <input
            type="text"
            value={orderno}
            onChange={(e) => setOrderNo(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>DueDate</label>
          <input
            type="text"
            value={duedate}
            onChange={(e) => setDuedate(e.target.value)}
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

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveOrder}>
          Save
        </button>

      </div>
    </div>
  );
};

export default CreateOrder;