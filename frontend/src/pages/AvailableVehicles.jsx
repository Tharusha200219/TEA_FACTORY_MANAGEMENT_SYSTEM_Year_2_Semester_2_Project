import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch available vehicles data from the API
    axios.get('http://localhost:5555/vehicles')
      .then(response => {
        setVehicles(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching available vehicles:', error);
      });
  }, []);

  const handleStatusChange = (e, id) => {
    const newStatus = e.target.value;
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle._id === id) {
        return { ...vehicle, Status: newStatus };
      }
      return vehicle;
    });
    setVehicles(updatedVehicles);
  };

  return (
    <div>
      <h1>Available Vehicles</h1>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>No</th>
            <th className='border border-slate-600 rounded-md'>Type</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Reg Num</th>
            <th className='border border-slate-600 rounded-md max-md:hidden'>Added Year</th>
            <th className='border border-slate-600 rounded-md'>Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={vehicle._id} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
              <td className='border border-slate-700 rounded-md text-center'>{vehicle.Type}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{vehicle.RegNum}</td>
              <td className='border border-slate-700 rounded-md text-center max-md:hidden'>{new Date(vehicle.AddedYear).toLocaleDateString()}</td>
              <td className='border border-slate-700 rounded-md text-center'>
                <select
                  value={vehicle.Status}
                  onChange={(e) => handleStatusChange(e, vehicle._id)}
                  className="outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableVehicles;
