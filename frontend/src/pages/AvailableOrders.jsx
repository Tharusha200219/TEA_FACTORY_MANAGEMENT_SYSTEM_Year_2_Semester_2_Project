import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import styled from 'styled-components'; // Import styled-components

const PageContainer = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Table = styled.table`
  width: calc(100% - 20px); /* Subtract 20px from the width */
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

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1d4ed8;
  }
`;

const AvailableOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/orders`)
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (input) => {
    setSearchInput(input);
    const filtered = orders.filter((order) =>
      order.orderno.toString().includes(input)
    );
    setFilteredOrders(filtered);
  };

  const handleSetButtonClick = (order) => {
    const { orderno, quantity, Address, status } = order; // Destructure the required data from the order object
    navigate('/DeliveryOrder', {
      state: { 
        orderData: { // Pass the required data as an object
          orderno,
          quantity,
          Address,
          status
        }
      }
    });
  };

  const pendingOrders = orders.filter((order) => order.status === 'Delivered');

  return (
    <PageContainer>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link
              to="/V_home"
              className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/TrackVehicle"
              className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Order Tracking
            </Link>
          </div>
        </div>
      </nav>

      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Orders List</h1>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Order id</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Category</TableHeader>
                <TableHeader>Address</TableHeader>
                <TableHeader>Delivery Status</TableHeader>
                <TableHeader>Delivery</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {(searchInput === '' ? pendingOrders : filteredOrders).map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{order.orderno}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.category}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleSetButtonClick(order)}>delivery Order</Button>
                  </TableCell>
                </TableRow> 
              ))}
            </tbody>
          </Table>
        </TableContainer>
        
          
        )}
      </div>

      <Footer />
    </PageContainer>
  );
};

export default AvailableOrders;