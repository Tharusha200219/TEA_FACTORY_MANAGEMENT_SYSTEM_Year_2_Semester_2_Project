import React, { useState, useEffect } from 'react';
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
  background-image: url('./public/images/th24.jpg'); /* Add your background image URL here */
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
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

const Select = styled.select`
  border: 2px solid #a0aec0;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
`;

const Option = styled.option`
  padding: 0.5rem;
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

const EditVehicle = () => {
  const [Type, setType] = useState('');
  const [RegNum, setRegNum] = useState('');
  const [AddedYear, setAddedYear] = useState('');
  const [EngineNum, setengineNum] = useState('');
  const [ChesiNum, setchesiNum] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/vehicles/${id}`)
      .then((response) => {
        const { Type, RegNum, AddedYear, EngineNum, ChesiNum, Owner } = response.data;
        setType(Type);
        setRegNum(RegNum);
        setAddedYear(AddedYear);
        setengineNum(EngineNum);
        setchesiNum(ChesiNum);
        setOwner(Owner);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error fetching Vehicle data:', error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditVehicle = () => {
    const data = {
      Type,
      RegNum,
      AddedYear,
      EngineNum,
      ChesiNum,
      Owner,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/vehicles/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle edited successfully', { variant: 'success' });
        navigate('/Vehiclehome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An error occurred. Please check the console.', { variant: 'error' });
        console.error('Error editing vehicle:', error);
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
            value={Type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Reg Num</Label>
          <Input
            type='text'
            value={RegNum}
            onChange={(e) => setRegNum(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Added Year</Label>
          <Input
            type='date'
            value={AddedYear}
            onChange={(e) => setAddedYear(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Engine Number</Label>
          <Input
            type='String'
            value={EngineNum}
            onChange={(e) => setengineNum(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Chesi Number</Label>
          <Input
            type='String'
            value={ChesiNum}
            onChange={(e) => setchesiNum(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <Label>Owner</Label>
          <Select
            value={Owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <Option value="">Select Owner</Option>
            <Option value="Owner 1">Owner 1</Option>
            <Option value="Owner 2">Owner 2</Option>
            <Option value="Owner 3">Owner 3</Option>
            {/* Add more options as needed */}
          </Select>
        </div>
        <Button onClick={handleEditVehicle}>Edit Vehicle</Button>
        <Button onClick={() => navigate('/Vehiclehome')} className='ml-2'>Cancel</Button>
      </FormContainer>
    </Container>
  );
};

export default EditVehicle;
