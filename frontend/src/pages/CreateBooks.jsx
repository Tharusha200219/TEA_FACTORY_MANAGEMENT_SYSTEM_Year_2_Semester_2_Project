import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Container = styled.div`
  max-width: Auto;
  background-color: #f7fafc;
  background-image: url("./public/images/th676.jpg");
  margin: 0 auto;
  padding: 2rem;
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Added background color with opacity */
  background-image: url("./public/images/th676.jpg");
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

  .active {
    background-color: #333;
    color: #fff;
  }
`;

const CreateBooks = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    // Validation checks
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'warning' });
      return;
    }

    // Your save book logic here
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

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <NavigationBar />
      <SecondaryNavbar>
        <NavLink to="/books/create" activeClassName="active">Add New Vehicle</NavLink>
        <NavLink to="/available-parts">Available Vehicles</NavLink>
        <NavLink to="/orders">View Orders</NavLink>
        <NavLink to="/ReportVehicle">Generate Report</NavLink>
      </SecondaryNavbar>
      <BackButton />
      <h1 className='text-3xl my-4'><center>Add New Vehicle</center></h1>
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
      <Footer />
    </Container>
  );
};

export default CreateBooks;
