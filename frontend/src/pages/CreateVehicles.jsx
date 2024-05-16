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
  max-width: 100%;
  max-height: 100%;
  background-image: url("./public/images/th29.jpg");
  margin: 0 auto;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  display: flex; /* Use flexbox */
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #408c44;
  padding: 1rem;
  display: flex;
  flex-direction: column;
 
`;

const SidebarLink = styled(NavLink)`
  color: white;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  text-decoration: none;

  &:hover {
    background-color: #333;
  }

  &.active {
    background-color: #333;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex; /* Use flexbox */
  flex-direction: column;
`;

const FormContainer = styled.div`
  flex: 1; /* Take up remaining space */
  max-width: 100%;
  margin-right: 25px;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-gap: 1.0rem;
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

const CreateVehicles = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveVehicle = () => {
    // Validation checks
    if (!Type.trim() || !RegNum.trim() || !AddedYear.trim() || !EngineNum.trim() || !ChesiNum.trim() || !Owner.trim()) {
      enqueueSnackbar('Please fill in all fields.', { variant: 'warning' });
      return;
    }

    // Your save book logic here
    const data = {
      Type,
      RegNum,
      AddedYear,
      EngineNum,
      ChesiNum,
      Owner,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/vehicles', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Vehicle Added successfully', { variant: 'success' });
        navigate('/Vehiclehome');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  const [Type, setType] = useState('');
  const [RegNum, setRegNum] = useState('');
  const [AddedYear, setAddedYear] = useState('');
  const [EngineNum, setengineNum] = useState('');
  const [ChesiNum, setchesiNum] = useState('');
  const [Owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Sidebar>
        <SidebarLink to="/vehicles/create" activeClassName="active">Add New Vehicle</SidebarLink>
        <SidebarLink to="/available-parts">Available Vehicles</SidebarLink>
        <SidebarLink to="/orders">View Orders</SidebarLink>
        <SidebarLink to="/ReportVehicle">Generate Report</SidebarLink>
      </Sidebar>
      <MainContent>
        <NavigationBar />
        <div>
          <BackButton />
          <h1 className='text-3xl my-4'><center>Add New Vehicle</center></h1>
          {loading && <Spinner />}
          <FormContainer>
            <div>
              <Label>Type</Label>
              <Input
                type='text'
                value={Type}
                onChange={(e) => setType(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                placeholder="Type"
                pattern="[0-9]*"
              />
            </div>
            <div>
              <Label>Reg Num</Label>
              <Input
                type='text'
                value={RegNum}
                onChange={(e) => setRegNum(e.target.value)}
                placeholder="Reg Num"
                pattern="[0-9]*"
              />
            </div>
            <div>
              <Label>Added Year</Label>
              <Input
                type='date'
                value={AddedYear}
                onChange={(e) => setAddedYear(e.target.value)}
                placeholder="Enter Added year"
                min={new Date().toISOString().split('T')[0]} // Set min attribute to current date
              />
            </div>
            <div>
              <Label>Engine Number</Label>
              <Input
                type='text'
                value={EngineNum}
                onChange={(e) => setengineNum(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                placeholder="Engine Number"
                pattern="[0-9]*"
              />
            </div>
            <div>
              <Label>Chesi Number</Label>
              <Input
                type='text'
                value={ChesiNum}
                onChange={(e) => setchesiNum(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                placeholder="Chesi Number"
                pattern="[0-9]*"
              />
            </div>
            <div>
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
            <Button onClick={handleSaveVehicle}>Save</Button>
          </FormContainer>
        </div>
        <Footer />
      </MainContent>
    </Container>
  );
};

export default CreateVehicles;
