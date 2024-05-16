import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const WastePage = () => {
  const [originalWasteList, setOriginalWasteList] = useState([]);
  const [wasteList, setWasteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);

    axios.get('http://localhost:5555/waste')
      .then((response) => {
        setOriginalWasteList(response.data);
        setWasteList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);  

  const handleSearch = () => {
    if (searchInput.trim() === '') {
      // If search input is empty, reset waste list to the original waste list
      setWasteList(originalWasteList);
    } else {
      // Perform search based on search input
      const filteredWasteList = originalWasteList.filter(item =>
        item.wasteid.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.teatype.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.inventorynumber.toLowerCase().includes(searchInput.toLowerCase())
      );
      setWasteList(filteredWasteList);
    }
  };

  const handleReportGeneration = () => {
    try {
      const doc = new jsPDF();
      const tableRows = [];

      // Add headers
      const headers = [['Waste ID', 'Batch ID', 'Tea Type', 'Inventory Number', 'Quantity', 'Date Recorded']];
      const rows = wasteList.map(item => [item.wasteid, item.batchid, item.teatype, item.inventorynumber, item.quantity, item.dateRecorded]);
      
      // Add rows to tableRows array
      tableRows.push(...headers);
      tableRows.push(...rows);

      // AutoTable plugin to generate PDF
      doc.autoTable({
        head: tableRows.slice(0, 1), // First row is the header
        body: tableRows.slice(1), // Remaining rows are data
        startY: 20, // Start Y position (adjust as needed)
      });

      // Save the PDF
      doc.save('Waste_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
 <NavigationBar />

{/* Main content with navigation links */}
<nav className="bg-green-500 p-4">
    <div className="container mx-auto flex justify-center">
        <div className="flex space-x-4">
            <Link to="/HomePage" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/inventorys" className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
            <Link to="/waste-management" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
            <Link to="/Pendingshipmentss" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
            <Link to="/Irawleaves" className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
        
        </div>
    </div>
</nav>

      {/* Main Content */}
      <div className='container mx-auto p-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-800'>Waste List</h1>
          <div className='flex items-center'>
            <input
              type='text'
              placeholder='Search...'
              className='border border-gray-300 px-4 py-2 rounded mr-4'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all mr-4'
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-all  mr-4'
              onClick={handleReportGeneration}
            >
              Generate Report
            </button>
            <Link to="/waste/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add New Waste
            </Link>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <table className='w-full border-collapse border border-gray-300'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-gray-300 p-4 text-left'>Waste ID</th>
                <th className='border border-gray-300 p-4 text-left'>Batch ID</th>
                <th className='border border-gray-300 p-4 text-left'>Tea Type</th>
                <th className='border border-gray-300 p-4 text-left'>Inventory Number</th>
                <th className='border border-gray-300 p-4'>Quantity</th>
                <th className='border border-gray-300 p-4'>Date Recorded</th>
                <th className='border border-gray-300 p-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {wasteList.map((item, index) => (
                <tr key={index} className='border border-gray-300'>
                  <td className='border border-gray-300 p-4'>{item.wasteid}</td>
                  <td className='border border-gray-300 p-4'>{item.batchid}</td>
                  <td className='border border-gray-300 p-4'>{item.teatype}</td>
                  <td className='border border-gray-300 p-4'>{item.inventorynumber}</td>
                  <td className='border border-gray-300 p-4'>{item.quantity}</td>
                  <td className='border border-gray-300 p-4'>{item.dateRecorded}</td>
                  <td className='border border-gray-300 p-4'>
                    <div className='flex justify-center gap-x-4'>
                      <Link to={`/waste/details/${item._id}`} className='text-2xl text-green-800'>
                       <BsInfoCircle />
                      </Link>
                      <Link to={`/waste/edit/${item._id}`} className='text-2xl text-yellow-600'>
                       <AiOutlineEdit />
                      </Link>
                      <Link to={`/waste/delete/${item._id}`} className='text-2xl text-red-600'>
                       <MdOutlineDelete />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WastePage;
