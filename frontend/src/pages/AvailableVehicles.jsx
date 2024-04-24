import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';

const Container = styled.div`
  max-width: Auto;
  
  background-image: url("./public/images/th2.jpg");
  margin: 0 auto;
  padding: 2rem;
  background-size: cover;
  background-position: center;
`;

const TableContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-gap: 1.5rem;
  justify-items: center;
`;

const Table = styled.table`
  width: 100%;
 
  border-collapse: collapse;
  
`;

const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 2px solid #a0aec0;
`;

const Td = styled.td`
  padding: 0.5rem;
  border-bottom: 1px solid #a0aec0;
  
`;

const AvailableVehicles = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [vehicles, setVehicle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/vehicles');
        setVehicle(response.data);
      } catch (error) {
        enqueueSnackbar('Error fetching vehicles', { variant: 'error' });
        console.log(error);
      }
    };

    fetchData();
  }, [enqueueSnackbar]);

  return (
    <Container>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>No</Th>
              <Th>Type</Th>
              <Th>Reg Num</Th>
              <Th>Available</Th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(vehicles) && vehicles.map((vehicle, index) => (
              <tr key={vehicle.id}>
                <Td>{index + 1}</Td>
                <Td>{vehicle.Type}</Td>
                <Td>{vehicle.RegNum}</Td>
                <Td>{vehicle.available ? 'Yes' : 'No'}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AvailableVehicles;
