import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const DepartmentHome = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/departments')
      .then((response) => {
        setDepartments(response.data.data);
        setFilteredDepartments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredDepartments(
      departments.filter((department) =>
        department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleStatusChange = (id, status) => {
    if (status !== 'Active' && status !== 'Inactive') {
      console.error('Invalid status selected');
      return;
    }
    // Here you can send an API request to update the department status
    console.log(`Department with ID ${id} status changed to ${status}`);
  };

  const handleGenerateReport = () => {
    // Here you can send an API request to generate a report
    console.log('Generating report...');
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl'>Departments List</h1>
        <div className='flex items-center'>
          <Link to='/departments/create' className='flex items-center text-sky-800 hover:underline mr-4'>
            <MdOutlineAddBox className='mr-2' />
            Add Department
          </Link>
          <button
            onClick={handleGenerateReport}
            className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Generate Report
          </button>
        </div>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Search department name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-4 py-2'>No</th>
                <th className='px-4 py-2'>Department Name</th>
                <th className='px-4 py-2'>Department Details</th>
                <th className='px-4 py-2'>Created On</th>
                <th className='px-4 py-2'>Department Status</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.map((department, index) => (
                <tr key={department._id} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{department.departmentName}</td>
                  <td className='border px-4 py-2'>{department.departmentDetails}</td>
                  <td className='border px-4 py-2'>{new Date(department.createdOn).toLocaleString()}</td>
                  <td className='border px-4 py-2 text-center'>
                    <select
                      value={department.departmentStatus}
                      onChange={(e) => handleStatusChange(department._id, e.target.value)}
                      className={`px-2 py-1 rounded focus:outline-none ${
                        department.departmentStatus === 'Active' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                      }`}
                    >
                      <option value='Active'>Active</option>
                      <option value='Inactive'>Inactive</option>
                    </select>
                  </td>
                  <td className='border px-4 py-2'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/departments/details/${department._id}`}>
                        <BsInfoCircle className='text-green-800' />
                      </Link>
                      <Link to={`/departments/edit/${department._id}`}>
                        <AiOutlineEdit className='text-yellow-600' />
                      </Link>
                      <Link to={`/departments/delete/${department._id}`}>
                        <MdOutlineDelete className='text-red-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentHome;
