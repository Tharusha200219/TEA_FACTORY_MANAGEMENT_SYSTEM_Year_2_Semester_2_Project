import React, { useState, useEffect } from 'react';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Editproductions = () => {
  const [Schedule_no, setSchedule_no] = useState('');
  const [Production_date, setProduction_date] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Machine_assignment, setMachine_assignment] = useState('');
  const [shift_information, setShift_information] = useState('');
  const [Status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/productions/${id}`)
      .then((response) => {
        setSchedule_no(response.data.Schedule_no);
        setProduction_date(response.data.Production_date);
        setQuantity(response.data.Quantity);
        setMachine_assignment(response.data.Machine_assignment);
        setShift_information(response.data.shift_information);
        setStatus(response.data.Status);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditproductions = () => {
    const data = {
      Schedule_no,
      Production_date,
      Quantity,
      Machine_assignment,
      shift_information,
      Status,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/productions/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Productionhome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.log(error);
      });
  };

  return (
    <div>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
            <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
            <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
            <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
            <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                    <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                    
                </Link>
          </div>
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200'>
        <BackButtonForCreateProduction />
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
          <h1 className='text-3xl mb-6 font-bold text-gray-800 text-center'>Edit Production</h1>

          {loading && <Spinner />}

          <div className='space-y-4'>
            <div className='mb-4'>
              <label htmlFor='Schedule_no' className='text-lg text-gray-600'>Schedule No</label>
              <input
                id='Schedule_no'
                type='number'
                value={Schedule_no}
                onChange={(e) => setSchedule_no(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='Production_date' className='text-lg text-gray-600'>Production Date</label>
              <input
                id='Production_date'
                type='text'
                value={Production_date}
                onChange={(e) => setProduction_date(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='Quantity' className='text-lg text-gray-600'>Quantity</label>
              <input
                id='Quantity'
                type='text'
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='Machine_assignment' className='text-lg text-gray-600'>Machine Assignment</label>
              <input
                id='Machine_assignment'
                type='text'
                value={Machine_assignment}
                onChange={(e) => setMachine_assignment(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='shift_information' className='text-lg text-gray-600'>Shift Information</label>
              <input
                id='shift_information'
                type='number'
                value={shift_information}
                onChange={(e) => setShift_information(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='Status' className='text-lg text-gray-600'>Status</label>
              <select
                id='Status'
                value={Status}
                onChange={(e) => setStatus(e.target.value)}
                className='input-field'
              >
                <option value='done'>Done</option>
                <option value='not done'>Not Done</option>
              </select>
            </div>

            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
              onClick={handleEditproductions}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Editproductions;
