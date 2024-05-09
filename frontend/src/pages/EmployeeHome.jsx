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
    <div className="employee-home-container"> {/* Add this container */}
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/EmployeeHome" className="nav-link active">Employee List</Link>
            <Link to="/employees/create" className="nav-link">Register Employee</Link>
            <Link to="/GenerateRepoEmployee" className="nav-link">Employee Report</Link>
            <Link to="/EmailForm" className="nav-link">Login Invitation</Link>
          </div>
        </div>
      </nav>

      <div className='p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-4xl' style={{ marginTop: '40px',color: 'white'}}>Employee List</h1>
          <div className="flex items-center">
            <input
              type='text'
              placeholder='Search department name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='search-input mr-2'
            />
            <button className="search-button" onClick={() => console.log("Search clicked")}>Search</button>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className='overflow-x-auto'>
            <table className='employee-table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Employee Name</th>
                  <th>Email Address</th>
                  <th>Contact Number</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Created On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>{index + 1}</td>
                    <td>
                      {employee.image ? (
                        <img src={`http://localhost:5555/${employee.image.replace(/\//g, '\\')}`} alt="Employee" className="employee-image" />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{employee.employeeName}</td>
                    <td>{employee.employeeEmail}</td>
                    <td>{employee.employeeMobile}</td>
                    <td>{employee.employeeAddress}</td>
                    <td>{employee.employeeRoles}</td>
                    <td>{new Date(employee.createdOn).toLocaleString()}</td>
                    <td>
                      <div className='action-icons'>
                        <Link to={`/employees/details/${employee._id}`}>
                          <BsInfoCircle />
                        </Link>
                        <Link to={`/employees/edit/${employee._id}`}>
                          <AiOutlineEdit />
                        </Link>
                        <Link to={`/employees/delete/${employee._id}`}>
                          <MdOutlineDelete />
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

<<<<<<< Updated upstream
import './EmployeeHome.css';
=======
import './EmployeeHome.css';
>>>>>>> Stashed changes
