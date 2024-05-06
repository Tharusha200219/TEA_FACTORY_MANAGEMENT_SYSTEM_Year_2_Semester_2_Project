import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';


const EmployeeHome = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setFilteredEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredEmployees(
      employees.filter((employee) =>
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        
      )
    );
  }, [searchTerm, employees]);

  
  return (
    <div>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/EmployeeHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee List</Link>
            <Link to="/employees/create" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register Employee</Link>
            <Link to="/GenerateRepoEmployee" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee Report</Link>
            <Link to="/EmailForm" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login Invitation</Link>
          </div>
        </div>
      </nav>

     

      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl'>Employee List</h1>
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
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className="bg-gray-50">
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>No</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Image</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Employee Name</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Email Address</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Contact Number</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Address</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Role</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Created On</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee._id} className="bg-white">
                    <td className='border px-6 py-4 whitespace-nowrap'>{index + 1}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>
                      {/* Render image */}
                      {employee.image ? (
                        <img src={`http://localhost:5555/${employee.image.replace(/\//g, '\\')}`} alt="Employee" className="h-10 w-10 rounded-full" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeName}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeEmail}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeMobile}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeAddress}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeRoles}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{new Date(employee.createdOn).toLocaleString()}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>
                      <div className='flex justify-center gap-x-4'>
                        <Link to={`/employees/details/${employee._id}`}>
                          <BsInfoCircle className='text-green-800' />
                        </Link>
                        <Link to={`/employees/edit/${employee._id}`}>
                          <AiOutlineEdit className='text-yellow-600' />
                        </Link>
                        <Link to={`/employees/delete/${employee._id}`}>
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

      
      <Footer />
    </div>
  );
};

export default EmployeeHome;