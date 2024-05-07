import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const VehiclesTable = ({ vehicles }) => {
  // Check if vehicles array is defined and not empty
  if (!Array.isArray(vehicles) || vehicles.length === 0) {
    return <p>No vehicles available</p>;
  }

  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Type</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Reg Num
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Added Year
          </th>
          <th className='border border-slate-600 rounded-md'>Engine Number</th>
          <th className='border border-slate-600 rounded-md'>Chesi Number</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Owner
          </th>
          <th className='border border-slate-600 rounded-md'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={vehicle._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {vehicle.Type}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.RegNum}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {new Date(vehicle.AddedYear).toLocaleDateString()} {/* Modified to display only date */}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.EngineNum}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.ChesiNum}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.Owner}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/vehicles/details/${vehicle._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/vehicles/edit/${vehicle._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/vehicles/delete/${vehicle._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehiclesTable;
