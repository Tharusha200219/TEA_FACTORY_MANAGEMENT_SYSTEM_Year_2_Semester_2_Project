import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const EmailForm = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('EmployeeMangeAdmin'); // New state for filter option
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) => {
      if (filterOption === 'All') {
        return true;
      } else {
        return employee.employeeRoles === filterOption;
      }
    });
  
    setFilteredEmployees(
      filtered.filter((employee) =>
        employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees, filterOption]);

  const sendEmail = async (email) => {
    try {
      await axios.post('http://localhost:5555/send-email', {
        to: email,
        subject: 'Invitation to Login',
        text: 'You have been invited to login to the Employee Management System. Please follow the link provided to create your account.',
      });
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  // Modify the filter options to match exactly with the role selection options
  const filterOptions = [
   
    { label: 'Employee-Mange Admin', value: 'EmployeeMangeAdmin' },
    { label: 'Inventory Manager', value: 'InventryManager' },
    { label: 'Vehicle Manager', value: 'VehicleManager' },
    { label: 'Production Manager', value: 'ProductionManager' },
    { label: 'Payment Manager', value: 'PaymentManager' },
    { label: 'Supplier Manager', value: 'SupplierManager' },
    { label: 'Order Manager', value: 'OrderManager' },
    { label: 'Maintaince Manager', value: 'MaintainceManager' },
    // Add more options as needed
  ];

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <div className="flex-grow">
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/EmployeeHome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee List</Link>
            <Link to="/employees/create" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register Employee</Link>
            <Link to="/GenerateRepoEmployee" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee Report</Link>
            <Link to="/EmailForm" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login Invitation</Link>
          </div>
        </div>
      </nav>
      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl'>Department Mangers</h1>
        </div>

        <div>
            <label htmlFor="roleFilter" className="font-bold">Filter by Mangers:</label>
            <div>
              {filterOptions.map((option) => (
                <label key={option.value} style={{ marginRight: '10px' }}>
                  <input
                    type="radio"
                    name="roleFilter"
                    value={option.value}
                    checked={filterOption === option.value}
                    onChange={() => setFilterOption(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
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
                    <td className='border px-6 py-4 whitespace-nowrap'>{employee.employeeRoles}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>{new Date(employee.createdOn).toLocaleString()}</td>
                    <td className='border px-6 py-4 whitespace-nowrap'>
                    <div className='flex justify-center gap-x-4'>
                    <button className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-full text-sm font-medium" onClick={() => sendEmail(employee.employeeEmail)}>Send URL</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailForm;


