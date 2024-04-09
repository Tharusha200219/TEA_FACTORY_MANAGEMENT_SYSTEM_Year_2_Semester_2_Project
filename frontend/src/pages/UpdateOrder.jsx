import React, { useState,useEffect} from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

const UpdateOrder = () => {
  const [orderno, setOrderNo] = useState('');
  const [duedate, setDuedate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} =useParams();
  useEffect(()=>{
      setLoading(true);
      axios.get(`http://localhost:5555/orders/${id}`)
      .then((response)=>{
        setOrderNo(response.data.orderno);
        setDuedate(response.data.duedate);
        setQuantity(response.data.quantity)
        setCategory(response.data.category)
        setLoading(false);
      }).catch((error)=>{
        setLoading(false);
        alert('An error happenned.Plz check console');
        console.log(error);
      });
},[])

      
  

  const handleUpdateOrder = () => {
    const data = {
      orderno,
      duedate, 
      quantity,
      category,
    };
    setLoading(true);
    axios.put('http://localhost:5555/orders/${id}', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className=' text-3xl my-4'>Update Order</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

        
        <div className='my-4'>
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
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='p-4'>
          <label className='text-xl mr-4 text-gray-500'>Category</label>
          <input
            type="number"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleUpdateOrder}>
          Save
        </button>

      </div>
    </div>
  );
};

export default UpdateOrder;