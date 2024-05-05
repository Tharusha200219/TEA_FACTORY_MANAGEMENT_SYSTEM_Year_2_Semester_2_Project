import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton_c';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const Container = styled.div`
background-color: Gray;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

`;

const Card = styled.div`
background-image: url("./public/images/th676.jpg");
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
  color: white;
`;

const Value = styled.span`
  font-size: 1.1rem;
  color: white;
`;

const ShowVehicle = () => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
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
      <h1 className='text-3xl my-4-white'>Show vehicle</h1>
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          <Field>
            <Label>Type: </Label>
            <Value>{vehicle.Type}</Value>
          </Field>
          <Field>
            <Label>Reg Num: </Label>
            <Value>{vehicle.RegNum}</Value>
          </Field>
          <Field>
            <Label>Added Year: </Label>
            <Value>{vehicle.AddedYear}</Value>
          </Field>
          <Field>
            <Label>Engine Number: </Label>
            <Value>{vehicle.EngineNum}</Value>
          </Field>
          <Field>
            <Label>Chesi Number: </Label>
            <Value>{vehicle.ChesiNum}</Value>
          </Field>
          <Field>
            <Label>Owner: </Label>
            <Value>{vehicle.Owner}</Value>
          </Field>
          <Field>
            <Label>Create Time: </Label>
            <Value>{new Date(vehicle.createdAt).toString()}</Value>
          </Field>
          <Field>
            <Label>Last Update Time: </Label>
            <Value>{new Date(vehicle.updatedAt).toString()}</Value>
          </Field>
        </Card>
      )}
    </Container>
  );
};

export default ShowVehicle;
