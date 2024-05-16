
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';

const DepartmentHome = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [generateReport, setGenerateReport] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/departments')
      .then((response) => {
        setDepartments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = departments.filter((department) => {
      if (filterOption === 'All') {
        return true;
      } else {
        return department.departmentStatus === filterOption;
      }
    });

    setFilteredDepartments(
      filtered.filter((department) =>
        department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, departments, filterOption]);

  const handleStatusChange = (id, status) => {
    if (status !== 'Active' && status !== 'Inactive') {
      console.error('Invalid status selected');
      return;
    }
    console.log(`Department with ID ${id} status changed to ${status}`);
  };

  const onDelete = () => {
    // Handle deletion logic here
  };

  const generateReportData = () => {
    // Generate report data logic
    setGenerateReport(true);
  };

  const downloadReport = () => {
    // Download report logic
  };

  // PDF generation component
  const ReportDocument = () => (
    <Document>
      <Page size="A1">
        <View>
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>Departments List</Text>
          <View>
            {filteredDepartments.map((department, index) => (
              <View key={department._id}>
                <Text>No: {index + 1}</Text>
                <Text>Department Name: {department.departmentName}</Text>
                <Text>Department Details: {department.departmentDetails}</Text>
                <Text>Created On: {new Date(department.createdOn).toLocaleString()}</Text>
                <Text>Department Status: {department.departmentStatus}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="flex flex-col h-screen">
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/DepartmentHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Department List</Link>
            <Link to="/departments/create" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register Department</Link>
          </div>
        </div>
      </nav>
      <div className='flex-grow'>
        <div className='p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-3xl'>Departments List</h1>
            <div className='flex items-center'>
              
              
              {generateReport ? (
                <PDFDownloadLink
                  document={<ReportDocument />}
                  fileName="departments_list.pdf"
                  className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                </PDFDownloadLink>
              ) : (
                <button
                  onClick={generateReportData}
                  className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  Generate Report
                </button>
              )}
            </div>
          </div>
          <div className='flex justify-between items-center mb-4'>
            <input
              type='text'
              placeholder='Search department'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div>
              <label htmlFor="statusFilter" className="font-bold">Filter by status</label>
              <div>
                <label style={{ marginRight: '10px' }}>
                  <input
                    type="radio"
                    id="all"
                    name="statusFilter"
                    value="All"
                    checked={filterOption === 'All'}
                    onChange={() => setFilterOption('All')}
                    className="status-radio"
                  />
                  All
                </label>
                <label style={{ marginRight: '10px' }}>
                  <input
                    type="radio"
                    id="active"
                    name="statusFilter"
                    value="Active"
                    checked={filterOption === 'Active'}
                    onChange={() => setFilterOption('Active')}
                    className="status-radio-active"
                  />
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    id="inactive"
                    name="statusFilter"
                    value="Inactive"
                    checked={filterOption === 'Inactive'}
                    onChange={() => setFilterOption('Inactive')}
                    className="status-radio-inactive"
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                {/* Table header */}
                <thead>
                  <tr className='bg-green-100'>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>No</th>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>Department Name</th>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>Department Details</th>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>Created On</th>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>Department Status</th>
                    <th className='px-4 py-2' style={{ backgroundColor: '#3FC060' }}>Action</th>
                  </tr>
                </thead>

                {/* Table body */}
                <tbody>
                  {filteredDepartments.map((department, index) => (
                    <tr key={department._id} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                      <td className='border px-4 py-2'>{index + 1}</td>
                      <td className='border px-4 py-2'>{department.departmentName}</td>
                      <td className='border px-4 py-2'>{department.departmentDetails}</td>
                      <td className='border px-4 py-2'>{new Date(department.createdOn).toLocaleString()}</td>
                      <td className='border px-4 py-2 text-center'>{department.departmentStatus}</td>
                      <td className='border px-4 py-2'>
                        <div className='flex justify-center gap-x-4'>
                          <Link to={`/departments/details/${department._id}`}>
                            <BsInfoCircle className='text-green-800' />
                          </Link>
                          <Link to={`/departments/edit/${department._id}`}>
                            <AiOutlineEdit className='text-yellow-600' />
                          </Link>
                          <Link to={`/departments/delete/${department._id}`} onClick={onDelete}>
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
      </div>
      <Footer />
    </div>
  );
};

export default DepartmentHome;
