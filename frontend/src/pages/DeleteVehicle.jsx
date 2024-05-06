import React, { useState } from 'react';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #e53e3e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c53030;
  }
`;

const DeleteVehicle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteVehicle = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/vehicles/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/Vehiclehome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <Container>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Vehicle</h1>
      {loading ? <Spinner /> : ''}
      <Card>
        <h3 className='text-2xl'>Are you sure you want to delete this vehicle?</h3>
        <div className='flex justify-center gap-4 mt-8'>
          <Button onClick={handleDeleteVehicle}>Yes, Delete it</Button>
          <Button onClick={() => navigate('/Vehiclehome')}>Cancel</Button>
        </div>
      </Card>
    </Container>
  );
};

export default DeleteVehicle;
