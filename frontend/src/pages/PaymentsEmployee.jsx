import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';


const PaymentsEmployee = () => {
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

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Navigation Bar */}
           
            <NavigationBar />

            <div className="container mx-auto flex justify-center items-center h-full ">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-8">Welcome to Ever Green Tea</h1>
                    <div className="space-y-4">
                        <Link to="/PaymentsHome">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Suppliers
                            </button>
                        </Link>
                        <Link to="/PaymentsEmployee">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Employees
                            </button>
                        </Link>
                        
                    </div>
                </div>
            </div>
            <div className='p-20' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Employee Table</h1>
                    <Link
                        to='/suppliers/create'
                        className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center'>
                        Add New
                    </Link>
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
             {/* Footer */}
             <Footer />
        </div>
        
    );
}

export default PaymentsEmployee;
