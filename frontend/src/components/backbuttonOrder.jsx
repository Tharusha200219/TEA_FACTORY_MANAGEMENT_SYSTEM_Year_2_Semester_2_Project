import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import React from 'react';


const BackButtonOrder = ({ destination = '/OrderHome' }) => {
  return (
    <div className='flex'>
      <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButtonOrder;

