import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const EmployeeHome = () => {
  const [employees, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then((response) => {
        setEmployee(response.data.data);
        setFilteredEmployee(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredEmployee(
      employees.filter((employee) =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  
  const handleGenerateReport = () => {
    // Here you can send an API request to generate a report
    console.log('Generating report...');
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-3xl'>Employee List</h1>
        <div className='flex items-center'>
          <Link to='/employees/create' className='flex items-center text-sky-800 hover:underline mr-4'>
            <MdOutlineAddBox className='mr-2' />
            Add Employee
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
                <th className='px-4 py-2'>Employee Name</th>
                <th className='px-4 py-2'>Employee Mobile</th>
                <th className='px-4 py-2'>Employee Address</th>
                <th className='px-4 py-2'>Employee Role</th>
                <th className='px-4 py-2'>created On</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployee.map((employee, index) => (
                <tr key={employee._id} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{employee.employeeName}</td>
                  <td className='border px-4 py-2'>{employee.employeeMobile}</td>
                  <td className='border px-4 py-2'>{employee.employeeAddress}</td>
                  <td className='border px-4 py-2'>{employee.employeeRoles}</td>
                  <td className='border px-4 py-2'>{new Date(employee.createdOn).toLocaleString()}</td>
                  
                  <td className='border px-4 py-2'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/departments/details/${employee._id}`}>
                        <BsInfoCircle className='text-green-800' />
                      </Link>
                      <Link to={`/departments/edit/${employee._id}`}>
                        <AiOutlineEdit className='text-yellow-600' />
                      </Link>
                      <Link to={`/departments/delete/${employee._id}`}>
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

export default EmployeeHome;
