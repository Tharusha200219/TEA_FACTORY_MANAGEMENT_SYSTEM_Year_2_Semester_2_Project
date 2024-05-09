import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #3AC056;
  color: #ffffff;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #cbd5e0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: black;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #cbd5e0;
`;

const ActionLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

const VehiclesTable = ({ vehicles }) => {
  // Check if vehicles array is defined and not empty
  if (!Array.isArray(vehicles) || vehicles.length === 0) {
    return <p>No vehicles available</p>;
  }

  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>No</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader className='max-md:hidden'>Reg Num</TableHeader>
          <TableHeader className='max-md:hidden'>Added Year</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <TableRow key={vehicle._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{vehicle.Type}</TableCell>
            <TableCell className='max-md:hidden'>{vehicle.RegNum}</TableCell>
            <TableCell className='max-md:hidden'>
              {new Date(vehicle.AddedYear).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className='flex justify-center gap-x-4'>
                <ActionLink to={`/vehicles/details/${vehicle._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </ActionLink>
                <ActionLink to={`/vehicles/edit/${vehicle._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </ActionLink>
                <ActionLink to={`/vehicles/delete/${vehicle._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </ActionLink>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default VehiclesTable;
