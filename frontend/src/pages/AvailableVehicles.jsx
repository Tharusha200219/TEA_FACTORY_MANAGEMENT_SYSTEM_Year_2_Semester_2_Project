import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import styled from 'styled-components'; // Import styled-components

// Styled-components for page container
const PageContainer = styled.div`
  background-color: black;
  color: white;
`;

// Styled-components for table
const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #3AC056;
  padding: 0.75rem;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid white; /* Add border-bottom for horizontal line */
`;

const Select = styled.select`
  outline: none;
  background-color: black;
  hover: hover:bg-gray-100;
  transition-colors: duration 200ms;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

const AvailableVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [refresh, setRefresh] = useState(false); // State to trigger page refresh

  useEffect(() => {
    // Fetch available vehicles data from the API
    axios.get('http://localhost:5555/vehicles')
     .then(response => {
        setVehicles(response.data.data);
      })
     .catch(error => {
        console.error('Error fetching available vehicles:', error);
      });
  }, [refresh]); // Trigger useEffect on refresh state change

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle._id === id) {
        return {...vehicle, Status: newStatus };
      }
      return vehicle;
    });
    setVehicles(updatedVehicles);
  };

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh); // Toggle refresh state to trigger useEffect
  };

  const location = useLocation();

  return (
    <PageContainer>
      <NavigationBar />
      <div className="flex">
        {/* Sidebar */}
        <div className={`h-screen w-64 bg-gray-800 text-white p-4 ${showSidebar ? 'block' : 'show'}`} style={{ backgroundImage: 'url("./public/images/th29.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h1 className="text-2xl font-bold mb-4">Available Vehicles</h1>
          <Link to="/vehicles/create" className={`block py-3 px-5 ${location.pathname === '/vehicles/create' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600 hover:text-white'}`}>
             Add New Vehicle
          </Link>
          <Link to="/AvailableVehicles" className={`block py-2 px-4 ${location.pathname === '/AvailableVehicles' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600 hover:text-white'}`}>
            Vehicle List
          </Link>
          <Link to="/TrackVehicle" className={`block py-2 px-4 ${location.pathname === '/TrackVehicle' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600 hover:text-white'}`}>
            Available Vehicles
          </Link>
          <Link to="/ReportVehicle" className={`block py-2 px-4 ${location.pathname === '/ReportVehicle' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600 hover:text-white'}`}>
            Generate Report
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          
          <h1 className="text-2xl text-center font-bold mb-4">Available Vehicles</h1>
          <TableContainer>
            <StyledTable>
              <thead>
                <TableRow>
                  <TableHeader>No</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader className="max-md:hidden">Reg Num</TableHeader>
                  <TableHeader className="max-md:hidden">Added Year</TableHeader>
                  <TableHeader>Status</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={vehicle._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{vehicle.Type}</TableCell>
                    <TableCell className="max-md:hidden">{vehicle.RegNum}</TableCell>
                    <TableCell className="max-md:hidden">{new Date(vehicle.AddedYear).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select
                        value={vehicle.Status}
                        onChange={(e) => handleStatusChange(e, vehicle._id)}
                      >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </TableContainer>
          <button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Refresh</button>
        </div>
      </div>
      <Footer />
    </PageContainer>
  );
};

export default AvailableVehicles;
