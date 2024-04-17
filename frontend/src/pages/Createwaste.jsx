import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const WasteCreate = () => {
  const [wasteData, setWasteData] = useState({
    wasteid: '',
    teatype: '',
    inventorynumber: '',
    quantity: '',
    batchid: '',
  });

  const [teaTypes, setTeaTypes] = useState([]);
  const [inventoryNumbers, setInventoryNumbers] = useState([]);
  const [batchIds, setBatchIds] = useState([]);
  const [wasteIdError, setWasteIdError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tea types, inventory numbers, and batch IDs
    axios.get('http://localhost:5555/inventory')
      .then(response => {
        const data = response.data;
        const teaTypes = [...new Set(data.map(item => item.category))];
        const inventoryNumbers = data.map(item => item.inventorynumber);
        const batchIds = data.map(item => item.batchid);
        setTeaTypes(teaTypes);
        setInventoryNumbers(inventoryNumbers);
        setBatchIds(batchIds);
      })
      .catch(error => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const validateWasteId = (value) => {
    if (!/^[a-zA-Z0-9#]{1,10}$/.test(value)) {
      setWasteIdError('Waste ID can only contain numbers, letters, and # sign, and should not exceed 10 characters');
    } else {
      setWasteIdError('');
    }
  };

  const validateQuantity = (value) => {
    if (!/^\d{1,10}$/.test(value)) {
      setQuantityError('Quantity should only contain numbers and should not exceed 10 characters');
    } else {
      setQuantityError('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === 'wasteid') {
      validateWasteId(value);
    } else if (name === 'quantity') {
      validateQuantity(value);
    }
    setWasteData({ ...wasteData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/waste', wasteData);
      navigate('/waste-management');
    } catch (error) {
      console.error('Error creating waste entry:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create Waste Entry</h1>
        <Link to="/waste-management" className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>Back to Waste Management</Link>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Waste ID:</label>
          <input type="text" name="wasteid" value={wasteData.wasteid} onChange={handleChange} className="input-fieldd" required />
          {wasteIdError && <div className="text-red-500">{wasteIdError}</div>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Tea Type:</label>
          <select name="teatype" value={wasteData.teatype} onChange={handleChange} className="input-fieldd" required>
            <option value="">Select Tea Type</option>
            {teaTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Inventory Number:</label>
          <select name="inventorynumber" value={wasteData.inventorynumber} onChange={handleChange} className="input-fieldd" required>
            <option value="">Select Inventory Number</option>
            {inventoryNumbers.map((number, index) => (
              <option key={index} value={number}>{number}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Quantity:</label>
          <input type="number" name="quantity" value={wasteData.quantity} onChange={handleChange} className="input-fieldd" required />
          {quantityError && <div className="text-red-500">{quantityError}</div>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Batch ID:</label>
          <select name="batchid" value={wasteData.batchid} onChange={handleChange} className="input-fieldd" required>
            <option value="">Select Batch ID</option>
            {batchIds.map((id, index) => (
              <option key={index} value={id}>{id}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-sky-800 text-white px-4 py-2 rounded-lg w-fit transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200 rainbow-text"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default WasteCreate;
