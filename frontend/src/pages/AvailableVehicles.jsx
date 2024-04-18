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
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #a0aec0;
`;

const AvailableVehicles = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5555/vehicles');
        setVehicles(response.data);
      } catch (error) {
        enqueueSnackbar('Error fetching vehicles', { variant: 'error' });
        console.log(error);
      }
    };

    fetchData();
  }, [enqueueSnackbar]);

  return (
    <Container>
      <NavigationBar />
      <SecondaryNavbar>
        <NavLink to="/books/create" activeClassName="active">
          Add New Vehicle
        </NavLink>
        <NavLink to="/available-parts" activeClassName="active">
          Available Vehicles
        </NavLink>
        <NavLink to="/orders">View Orders</NavLink>
        <NavLink to="/ReportVehicle">Generate Report</NavLink>
      </SecondaryNavbar>
      <BackButton />
      <h1 className="text-3xl my-4">
        <center>Available Vehicles</center>
      </h1>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Type</Th>
              <Th>Reg Num</Th>
              <Th>Added Year</Th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <Td>{vehicle.title}</Td>
                <Td>{vehicle.author}</Td>
                <Td>{vehicle.publishYear}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <Footer />
    </Container>
  );
};

export default AvailableVehicles;