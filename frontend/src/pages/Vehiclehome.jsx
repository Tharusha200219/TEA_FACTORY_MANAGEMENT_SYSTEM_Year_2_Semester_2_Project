import React, { useState } from 'react';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Added background color with opacity */
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-gap: 1.5rem;
  justify-items: center;
`;

const Label = styled.label`
  font-size: 1.25rem;
  color: #4a5568;
`;

const Input = styled.input`
  border: 2px solid #a0aec0;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const SecondaryNavbar = styled.nav`
  background-color: #408C44;
  padding: 1rem;
  display: flex;
  justify-content: center;

  a {
    color: white;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
`;

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
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
      <NavigationBar />
      <SecondaryNavbar>
        <a href="/books/create">Add New Vehicle</a>
        <a href="/available-parts">Available Vehicles</a>
        <a href="/orders">View Orders</a>
        <a href="/ReportVehicle">Generate Report</a>
      </SecondaryNavbar>
      <BackButton />
      <h1 className='text-3xl my-4'>Add New Vehicle</h1>
      {loading && <Spinner />}
      <FormContainer>
        <div>
          <Label>Type</Label>
          <Input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Reg Num</Label>
          <Input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <Label>Added Year</Label>
          <Input
            type='Date'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <Button onClick={handleSaveBook}>Save</Button>
      </FormContainer>
    </Container>
  );
}

export default CreateBooks;
