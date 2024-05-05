import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Editteatypes = () => {
  const [Schedule_no, setSchedule_no] = useState('');
  const [black_tea, setblack_tea] = useState('');
  const [green_tea, setgreen_tea] = useState('');
  const [oolong_tea, setoolong_tea] = useState('');
  const [white_tea, setwhite_tea] = useState('');
  const [tea_wastage, setTea_wastage] = useState('');
  const [status, setStatus] = useState('not send');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/teatypes/${id}`)
      .then((response) => {
        setSchedule_no(response.data.Schedule_no);
        setblack_tea(response.data.black_tea);
        setgreen_tea(response.data.green_tea);
        setoolong_tea(response.data.oolong_tea);
        setwhite_tea(response.data.white_tea);
        setTea_wastage(response.data.tea_wastage);
        setStatus(response.data.status);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('There was an error. Please check the console.');
        console.log(error);
      });
  }, [id]);

  const handleEditteatypes = () => {
    const data = {
      Schedule_no,
      black_tea,
      green_tea,
      oolong_tea,
      white_tea,
      tea_wastage,
      status,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/teatypes/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/Teatypehome');
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
        <div className="container mx-auto">
          <div className="mx-auto flex justify-center items-center">
            <div className="flex space-x-4">
              <Link to="/P_home" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/Teatypehome" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
              <Link to="/teatypes/creates" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
              <Link to="/pending-shipments" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
              <Link to="/TeaTypeReport" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
              <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className='flex flex-col items-center justify-center min-h-screen' style={{ backgroundColor: 'gray' }}>
        <BackButtonForCreateProduction />
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8 mt-8'>
          <h1 className='text-3xl mb-6 font-bold text-gray-800 text-center'>Edit Tea Type</h1>
          {loading && <Spinner />}
          <div className='space-y-4'>
            <div className='mb-4'>
              <label htmlFor='Schedule_no' className='text-lg text-gray-600'>Schedule No</label>
              <input
                id='Schedule_no'
                type='number'
                value={Schedule_no}
                readOnly
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='black_tea' className='text-lg text-gray-600'>black_tea</label>
              <input
                id='black_tea'
                type='number'
                value={black_tea}
                onChange={(e) => setblack_tea(e.target.value)}
                disabled={status !== 'not send'}
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='green_tea' className='text-lg text-gray-600'>green_tea</label>
              <input
                id='green_tea'
                type='number'
                value={green_tea}
                onChange={(e) => setgreen_tea(e.target.value)}
                disabled={status !== 'not send'}
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='oolong_tea' className='text-lg text-gray-600'>oolong_tea</label>
              <input
                id='oolong_tea'
                type='number'
                value={oolong_tea}
                onChange={(e) => setoolong_tea(e.target.value)}
                disabled={status !== 'not send'}
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='white_tea' className='text-lg text-gray-600'>white_tea</label>
              <input
                id='white_tea'
                type='number'
                value={white_tea}
                onChange={(e) => setwhite_tea(e.target.value)}
                disabled={status !== 'not send'}
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='tea_wastage' className='text-lg text-gray-600'>Tea Wastage</label>
              <input
                id='tea_wastage'
                type='number'
                value={tea_wastage}
                onChange={(e) => setTea_wastage(e.target.value)}
                disabled={status !== 'not send'}
                className='input-field'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='status' className='text-lg text-gray-600'>Status</label>
              <input
                id='status'
                type='text'
                value={status}
                readOnly
                className='input-field'
              />
            </div>
            {status === 'not send' && (
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full'
                onClick={handleEditteatypes}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Editteatypes;
