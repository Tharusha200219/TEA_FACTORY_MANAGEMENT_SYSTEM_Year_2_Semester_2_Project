import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButtonVehicle';
import Spinner from '../components/Spinner';

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Type</span>
            <span>{vehicle.type}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Reg Num</span>
            <span>{vehicle.regnum}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Max Kgs</span>
            <span>{vehicle.maxkgs}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date</span>
            <span>{vehicle.date}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(vehicle.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(vehicle.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowVehicle;