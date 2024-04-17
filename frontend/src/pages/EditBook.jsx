import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
 // Import the background image

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
 // Use the imported background image here
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  background-color: #f7fafc;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
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

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { title, author, publishYear } = response.data;
        setTitle(title);
        setAuthor(author);
        setPublishYear(publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error fetching book data:', error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
        navigate('/Vehiclehome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error editing book:', error);
      });
  };

  return (
    <Container>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Vehicle</h1>
      {loading && <Spinner />}
      <FormContainer>
        <div className='my-4'>
          <Label>Type</Label>
          <Input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Reg Num</Label>
          <Input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Added Year</Label>
          <Input
            type='date'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <Button onClick={handleEditBook}>Edit Vehicle</Button>
        <Button onClick={() => navigate('/Vehiclehome')} className='ml-2'>Cancel</Button>
      </FormContainer>
    </Container>
  );
};

export default EditBook;
