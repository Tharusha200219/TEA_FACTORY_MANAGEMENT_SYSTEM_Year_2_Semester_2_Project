import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButtonForDepartment = ({ destination = '/DepartmentHome' }) => {
    return (
        <div className='flex items-center'>
            <Link
                to={destination}
                className='bg-gray-300 text-black px-4 py-2 rounded-full flex items-center hover:bg-gray-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
                style={{ textDecoration: 'none' }}
            >
                <BsArrowLeft className='text-2xl mr-2' />
                <span className='text-lg'>Back to Department List</span>
            </Link>
        </div>
    );
};

export default BackButtonForDepartment;
