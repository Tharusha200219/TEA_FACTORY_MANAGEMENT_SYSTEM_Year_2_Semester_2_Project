import React, { useEffect,useState } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import{useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ShowOrder = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Order</h1>
      {loading?(
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
           <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>OrderId</span>
            <span>{order._id}</span>
            </div>
          <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Orderno</span>
            <span>{order.orderno}</span>
            </div>
            <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>DueDate</span>
            <span>{order.duedate}</span>
            </div>
            <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Quantity</span>
            <span>{order.quantity}</span>
            </div>
            <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Category</span>
            <span>{order.category}</span>
            </div>
            <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(order.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
            <span className='text-x1 mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(order.updatedAt).toString()}</span>
            </div>
          </div>

      
      )}
    </div>
  )
}

export default ShowOrder