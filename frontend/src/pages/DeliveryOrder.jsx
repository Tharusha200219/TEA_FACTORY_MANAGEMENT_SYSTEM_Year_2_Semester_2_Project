import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const DeliveryOrder = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedAddressType, setSelectedAddressType] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch vehicles data from the API
    axios.get('http://localhost:5555/vehicles')
      .then(response => {
        setVehicles(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Order data:', orderData);
  }, [orderData]);

  const handleVehicleChange = (event) => {
    const selectedVehicleType = event.target.value;
    setSelectedVehicle(selectedVehicleType);
    const selectedVehicleData = vehicles.find(vehicle => vehicle.Type === selectedVehicleType);
    if (selectedVehicleData) {
      setSelectedAddress(`${selectedVehicleData.factory}, ${selectedVehicleData.branch}`);
    } else {
      setSelectedAddress(null);
    }
  };

  const handleAddressSelection = (event) => {
    setSelectedAddressType(event.target.value);
    if (selectedVehicle) {
      const selectedVehicleData = vehicles.find(vehicle => vehicle.Type === selectedVehicle);
      if (selectedVehicleData) {
        setSelectedAddress(event.target.value === 'factory' ? selectedVehicleData.factory : selectedVehicleData.branch);
      }
    }
  };

  const handleDeliverClick = () => {
    // Navigate to TrackVehicle page
    navigate('/TrackVehicle');
  };

  if (!orderData) {
    return <div>Order not found</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Delivery Order</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead style={{ backgroundColor: '#3FC060' }}>
          <tr>
            <th style={tableHeaderStyle}>Order Number</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Address</th>
            <th style={tableHeaderStyle}>Vehicle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tableCellStyle}>{orderData.orderno}</td>
            <td style={tableCellStyle}>{orderData.quantity}</td>
            <td style={tableCellStyle}>
              <select value={selectedAddressType} onChange={handleAddressSelection} style={selectStyle}>
                <option value="">Select address type</option>
                <option value="factory">23/34, Heenkenda Mawatha, Baththaramulla</option>
                <option value="branch">Malabe place, Kaduwela</option>
              </select>
            </td>
            <td style={tableCellStyle}>
              <select value={selectedVehicle} onChange={handleVehicleChange} style={selectStyle}>
                <option value="">Select a vehicle</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle._id} value={vehicle.Type}>{vehicle.Type}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      {/* Additional Information */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Additional Information</h2>
        <div style={{ backgroundColor: '#3FC060', padding: '15px', borderRadius: '8px' }}>
          <p>Customer Name:<input type="text" style={{ borderRadius: '4px', border: '1px solid black', padding: '5px' }} /></p>
          <p>Contact Number: <input type="int" style={{ borderRadius: '4px', border: '1px solid black', padding: '5px' }} /></p>
          <p>Delivery Date:   <input type="date" style={{ borderRadius: '4px', border: '1px solid black', padding: '5px' }} /></p>
          <p>Delivery Time: <input type="time" style={{ borderRadius: '4px', border: '1px solid black', padding: '5px' }} /></p>
          <p>Special Instructions:</p>
          <textarea rows="4" style={{ width: '100%', borderRadius: '4px', border: '1px solid #ddd', padding: '8px' }}></textarea>
        </div>
      </div>
      {/* Delivery Summary */}
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Order Summary</h2>
        <div style={{ backgroundColor: '#3FC060', padding: '15px', borderRadius: '8px' }}>
          <p>Total Items: {orderData.quantity}</p>
          <p>Total Amount: $100.00</p>
        </div>
      </div>
      <button
        onClick={handleDeliverClick}
        style={{ ...deliverButtonStyle, ...(selectedVehicle && selectedAddress ? deliverButtonHoverStyle : null) }}
      >
        Deliver
      </button>
    </div>
  );
};

// CSS styles
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const selectStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  width: '100%',
  borderRadius: '4px',
};

const deliverButtonStyle = {
  marginTop: '20px',
  padding: '12px 24px',
  backgroundColor: '#3FC060',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

const deliverButtonHoverStyle = {
  backgroundColor: '#36A854',
};

export default DeliveryOrder;

