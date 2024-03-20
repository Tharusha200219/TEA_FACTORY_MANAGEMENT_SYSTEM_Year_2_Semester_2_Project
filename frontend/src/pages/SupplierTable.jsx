// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Spinner from '../../components/Spinner'
// import { Link } from 'react-router-dom';
// import { AiOutlineEdit } from 'react-icons/ai';
// import { BsInfoCircle } from 'react-icons/bs';
// import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

// const SupplierTable = () => {
//     const [suppliers, setSuppliers] = useState([]);
//     const [loading, setLoading] = useState(false);
 
//  useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:5555/suppliers')
//         .then((response) => {
//             console.log('Fetched suppliers:', response.data);
//             setSuppliers(response.data);
//             setLoading(false);
//         })
//         .catch((error) => {
//             console.error('Error fetching suppliers:', error);
//             setLoading(false);
//         });
// }, []);


//     return (
//         <div className='p-20'>
//             <div className='flex justify-between items-center mb-8'>
//                 <h1 className='text-3xl font-bold text-gray-800'>Supplier Table</h1>
//                 <Link
//                     to='/suppliers/create'
//                     className='bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center'>
//                 <MdOutlineAddBox className='text-xl mr-2' />
//                 Add New
//                </Link>
//             </div>

//             {loading ? (
//                 <Spinner />
//             ) : (
//                 <table className='w-full border-collapse border border-gray-300 '>
//                     <thead className='bg-gray-200'>
//                         <tr>
//                             <th className='border border-gray-300 p-4 text-left'>Supplier ID</th>
//                             <th className='border border-gray-300 p-4 text-left'>Name</th>
//                             <th className='border border-gray-300 p-4 text-left'>Address</th>
//                             <th className='border border-gray-300 p-4'>ContactNo</th>
//                             <th className='border border-gray-300 p-4'>Email</th>
//                             <th className='border border-gray-300 p-4'>Operations</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {suppliers.map((item, index) => (
//                             <tr key={item._id} className='border border-gray-300'>
//                                 <td className='border border-gray-300 p-4'>{item.supplierid}</td>
//                                 <td className='border border-gray-300 p-4'>{item.name}</td>
//                                 <td className='border border-gray-300 p-4'>{item.address}</td>
//                                 <td className='border border-gray-300 p-4'>{item.contact}</td>
//                                 <td className='border border-gray-300 p-4'>{item.email}</td>
//                                 <td className='border border-gray-300 p-4'>
//                                     <div className='flex justify-center gap-x-4'>
//                                         <Link to={`/suppliers/details/${item._id}`} className='text-2xl text-green-800'>
//                                             <BsInfoCircle />
//                                         </Link>
//                                         <Link to={`/suppliers/edit/${item._id}`} className='text-2xl text-yellow-600'>
//                                             <AiOutlineEdit />
//                                         </Link>
//                                         <Link to={`/suppliers/delete/${item._id}`} className='text-2xl text-red-600'>
//                                             <MdOutlineDelete />
//                                         </Link>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default SupplierTable;
