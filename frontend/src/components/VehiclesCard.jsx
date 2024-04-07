import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import VehicleSingleCard from './VehicleSingleCard';

const VehiclesCard = ({ vehicles }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {vehicles.map((item) => (
        <VehicleSingleCard key={item._id} vehicle={item} />
      ))}
    </div>
  );
};

export default VehiclesCard;