import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const VehiclesTable = ({ vehicles }) => {
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
          Max Kgs
          </th>
          <th className='border border-slate-600 rounded-md'>Date</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={vehicle._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {vehicle.type}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.regnum}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.maxkgs}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {vehicle.date}
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