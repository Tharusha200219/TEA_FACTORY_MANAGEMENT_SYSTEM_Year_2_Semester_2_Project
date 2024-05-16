import React, { useState, useEffect } from 'react';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInventory = () => {
  const [batchid, setBatchId] = useState('');
  const [category, setCategory] = useState('');
  const [inventorynumber, setInventoryNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [loading, setLoading] = useState(false);
  const [batchIdError, setBatchIdError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const navigate = useNavigate();
  const [teatypes, setTeatypes] = useState([]);
  
  const categories = ['Green Tea', 'Black Tea', 'Oolong Tea', 'White Tea', 'BOPF'];
  const inventoryNumbers = ['1a', '1b', '1c', '2a', '2b', '2c'];

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/teatypes')
      .then((response) => {
        setTeatypes(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSaveInventory = () => {
    if (batchIdError || quantityError || batchid.length < 5 ||!batchid || !category || !inventorynumber || !quantity) {
      alert('Please fill all fields correctly');
      return;
    }

    const data = {
      batchid,
      category,
      inventorynumber,
      quantity,
    };
    setLoading(true);
    axios.post('http://localhost:5555/inventory', data)
      .then(() => {
        setLoading(false);
        navigate('/Inventorys');
      })
      .catch((error) => {
        alert('An error occurred');
        console.log(error);
      });
  };

  useEffect(() => {
    // Real-time validation for batchid
    const pattern = /^#[A-Za-z]{0,2}(?:\d{0,4})$/;
    if (!pattern.test(batchid)) {
      setBatchIdError('Batch ID must start with # followed by up to two letters and up to four numbers');
    } else {
      setBatchIdError('');
    }
  }, [batchid]);

  useEffect(() => {
    // Real-time validation for quantity
    if (quantity.length > 6) {
      setQuantityError('Quantity must not exceed 6 digits');
    } else {
      setQuantityError('');
    }
  }, [quantity]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6) {
      setQuantity(value);
    }
  };

  const updateStatus = (id) => {
    axios.put(`http://localhost:5555/teatypes/${id}`, { status: 'add to the inventory' })
      .then((response) => {
        // Update the status in the state
        setTeatypes(prevState => {
          return prevState.map(teatype => {
            if (teatype._id === id) {
              return { ...teatype, status: 'add to the inventory' };
            }
            return teatype;
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container mx-auto px-4'>
      <BackButton />
      <h1 className='text-3xl my-4 text-center font-bold'>Create Inventory</h1>

      {loading ? <Spinner /> : ''}
      <div className='bg-white shadow-md rounded-lg px-8 py-6 mb-8'>

        <div className='mb-4'>
          <label className='block text-xl mb-2 text-gray-700'>Batch ID</label>
          <input
            type="text"
            value={batchid}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^#[A-Za-z]{0,2}(?:\d{0,4})$/.test(value)) {
                setBatchId(value);
              }
            }}
            className={`border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${batchIdError && 'border-red-500'}`}
          />
          {batchIdError && <div className="text-red-500">{batchIdError}</div>}
        </div>

        <div className='mb-4'>
          <label className='block text-xl mb-2 text-gray-700'>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-xl mb-2 text-gray-700'>Inventory Number</label>
          <select
            value={inventorynumber}
            onChange={(e) => setInventoryNumber(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          >
            <option value="">Select Inventory Number</option>
            {inventoryNumbers.map((number, index) => (
              <option key={index} value={number}>{number}</option>
            ))}
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-xl mb-2 text-gray-700'>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className={`border-2 border-gray-500 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${quantityError && 'border-red-500'}`}
          />
          {quantityError && <div className="text-red-500">{quantityError}</div>}
        </div>

        <button className='py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600' onClick={handleSaveInventory}>
          Save
        </button>
      </div>

      {/* TeaTypeHome Table */}
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8'>
        <thead className="bg-gray-50">
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Schedule No</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Black Tea (kg)</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Green Tea (kg)</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Oolong Tea (kg)</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>White Tea (kg)</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Tea Wastage</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Status</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teatypes.map((teatype, index) => (
            <tr key={teatype._id} className='h-8'>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.Schedule_no}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.black_tea}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.green_tea}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.oolong_tea}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.white_tea}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.tea_wastage}</td>
              <td className='px-6 py-4 whitespace-nowrap'>{teatype.status}</td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button onClick={() => updateStatus(teatype._id)} className='py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:bg-blue-600'>
                  Add to Inventory
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateInventory;
