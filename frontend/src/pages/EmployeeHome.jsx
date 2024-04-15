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
    // Format data for report
    const reportData = filteredEmployee.map((employee, index) => ({
      'No': index + 1,
      'Employee Name': employee.employeeName,
      'Email Address': employee.employeeEmail,
      'Contact Number': employee.employeeMobile,
      'Address': employee.employeeAddress,
      'Role': employee.employeeRoles,
      'Created On': new Date(employee.createdOn).toLocaleString(),
    }));

    // Create a CSV content
    const csvContent = 'data:text/csv;charset=utf-8,' +
      Object.keys(reportData[0]).join(',') + '\n' +
      reportData.map(obj => Object.values(obj).join(',')).join('\n');

    // Create a download link and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'employee_report.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/EmployeeHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee List</Link>
            <Link to="/employees/create" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register Employee</Link>
  
            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
              <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
              {/* You can replace "example-profile-image.jpg" with the actual path to your user profile image */}
            </Link>
          </div>
        </div>
      </nav>

      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl'>Employee List</h1>
          <div className='flex items-center'>
            
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
                  <th className='px-4 py-2'>Email Address</th>
                  <th className='px-4 py-2'>Contact Number</th>
                  <th className='px-4 py-2'>Address</th>
                  <th className='px-4 py-2'>Role</th>
                  <th className='px-4 py-2'>created On</th>
                  <th className='px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployee.map((employee, index) => (
                  <tr key={employee._id} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                    <td className='border px-4 py-2'>{index + 1}</td>
                    <td className='border px-4 py-2'>{employee.employeeName}</td>
                    <td className='border px-4 py-2'>{employee.employeeEmail}</td>
                    <td className='border px-4 py-2'>{employee.employeeMobile}</td>
                    <td className='border px-4 py-2'>{employee.employeeAddress}</td>
                    <td className='border px-4 py-2'>{employee.employeeRoles}</td>
                    <td className='border px-4 py-2'>{new Date(employee.createdOn).toLocaleString()}</td>

                    <td className='border px-4 py-2'>
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
