import React, { useState } from 'react';
import axios from 'axios';
import BackButtonOrder from '../components/backbuttonOrder';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useNavigate,useParams } from 'react-router-dom';


const DeleteOrders = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const {id} =useParams();
  const handleDeleteOrder=()=>{
    setLoading(true);
    axios
      .delete(`http://localhost:5555/orders/${id}`)
      .then(()=>{
        setLoading(false);
        navigate('/OrderHome');
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happened.Please check console');
        console.log(error);
      });
  };
  return (
    
    <div>
       <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">
            Ever Green Tea
          </div>
          <div className="flex space-x-4">
            <Link to="/./orders/change/:id" className="text-gray-300  bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/inventorys" className="text-gray-300   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
            
            
            <Link to="/waste-management" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
            
            <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
            <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending New Stocks</Link>
          </div>
        </div>
        </div>
        </nav>
      <div className='p-4'>
        <BackButtonOrder/>
        <h1 className='tet-3xl my-4'>Delete Order</h1>
        {loading?<Spinner/>:''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className='text-2xl'>Are you sure you want to delete this order?</h3>

          <button 
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteOrder}
            >Yes,Delete it</button>

        </div>
      </div>
     
   
    </div>
    
  )
};


export default DeleteOrders