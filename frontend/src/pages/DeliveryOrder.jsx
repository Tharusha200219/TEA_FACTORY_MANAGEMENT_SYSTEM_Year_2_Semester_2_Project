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
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
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
                <option value="factory">Factory</option>
                <option value="branch">Branch</option>
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
      <button onClick={handleDeliverClick} style={deliverButtonStyle}>Deliver</button>
    </div>
  );
};

// CSS styles
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'left',
};

const selectStyle = {
  border: '1px solid #ddd',
  padding: '5px',
  width: '100%',
  borderRadius: '4px',
};

const deliverButtonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#3FC060',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default DeliveryOrder;
