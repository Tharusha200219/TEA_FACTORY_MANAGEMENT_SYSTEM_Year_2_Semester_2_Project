import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const GenerateRepoEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then(response => {
        setEmployeeDetails(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleGenerateReport = () => {
    setLoading(true);
    const input = document.getElementById('employee-table');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a1');
      pdf.addImage(imgData, 'PNG', 0, 0, 841, 594);
      pdf.save('employee_report_A1.pdf');
      setLoading(false);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <Link to="/GenerateRepoEmployee" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Employee Report</Link>
              <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
              </Link>
            </div>
          </div>
        </nav>

        <div className="p-4">
          <h1 className="text-3xl my-4 ">Employee Report</h1>
          

          <div id="employee-table" className="relative">
            <button
              onClick={handleGenerateReport}
              className='absolute top-0 right-7 px-9 py-2  text-bold bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500'
              >
              Generate Report
            </button>
            <br></br>

            <div>
              <br></br>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Email Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Contact Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">Created On</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDetails.map((employee, index) => (
                  <tr key={employee._id} className="bg-white">
                    <td className="border px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeName}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeEmail}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeMobile}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeAddress}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeRoles}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{new Date(employee.createdOn).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenerateRepoEmployee;
