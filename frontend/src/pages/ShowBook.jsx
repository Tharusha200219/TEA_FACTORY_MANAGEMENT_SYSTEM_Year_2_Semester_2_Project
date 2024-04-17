import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Value = styled.span`
  font-size: 1.1rem;
  color: #555;
`;

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <BackButton />
      <h1 className='text-3xl my-4'>Show vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          <Field>
            <Label>Type: </Label>
            <Value>{book.title}</Value>
          </Field>
          <Field>
            <Label>Reg Num: </Label>
            <Value>{book.author}</Value>
          </Field>
          <Field>
            <Label>Added Year: </Label>
            <Value>{book.publishYear}</Value>
          </Field>
          <Field>
            <Label>Create Time: </Label>
            <Value>{new Date(book.createdAt).toString()}</Value>
          </Field>
          <Field>
            <Label>Last Update Time: </Label>
            <Value>{new Date(book.updatedAt).toString()}</Value>
          </Field>
        </Card>
      )}
    </Container>
  );
};

export default ShowBook;
