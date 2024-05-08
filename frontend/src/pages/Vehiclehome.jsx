import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineAccountCircle } from 'react-icons/md'; // Import the user profile icon
import VehiclesTable from '../components/home/VehiclesTable';
import VehiclesCard from '../components/home/VehiclesCard';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import backgroundSidebar from '/images/th29.jpg';


const GlobalStyleComponent = styled.div`
  display: flex;
  flex-direction: column;
  height: 130vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-image: url(${backgroundSidebar});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 60px;
background-color:black;
  background-size: cover;
  background-position: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: white;
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px); /* Adjust height to accommodate header and footer */
`;

const TableContainer = styled.div`
  margin-top: 2rem;
  color: white;
  border-color: white;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2rem;
  margin-top: 2rem;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const UserProfileIcon = styled(MdOutlineAccountCircle)`
  font-size: 24px;
  cursor: pointer;
`;

const Home = () => {
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showType, setShowType] = useState('table');
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5555/vehicles')
      .then((response) => {
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.Type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const report = filteredVehicles.map((vehicle) => vehicle.Type).join(', ');
    console.log('Generating report...');
    console.log('Report:', report);
  };

  

  return (
    <GlobalStyleComponent>
      <NavigationBar />
      <Container>
        <Sidebar>
          <UserProfileIcon /> {/* User profile icon */}
          <Link to="/vehicles/create" className={location.pathname === '/vehicles/create' ? 'active' : ''}>
            <MdOutlineAddBox /> Add New Vehicle
          </Link>
          <Link to="/AvailableVehicles" className={location.pathname === '/AvailableVehicles' ? 'active' : ''}>
            Vehicle List
          </Link>
          <Link to="/TrackVehicle" className={location.pathname === '/TrackVehicle' ? 'active' : ''}>
            Available Vehicles
          </Link>
          <Link
            to="/ReportVehicle"
            className={location.pathname === '/ReportVehicle' ? 'active' : ''}
            onClick={generateReport}
          >
            Generate Report
          </Link>
        </Sidebar>
        <Content>
          <Header>
            <h1 className="text-3xl font-semibold text-white-800">Vehicles List</h1>
            <Input
              type="text"
              placeholder="Search Vehicles..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </Header>
          {loading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : showType === 'table' ? (
            <TableContainer>
              <VehiclesTable vehicles={filteredVehicles} />
            </TableContainer>
          ) : (
            <CardContainer>
              <VehiclesCard vehicles={filteredVehicles} />
            </CardContainer>
          )}
        </Content>
      </Container>
      <Footer />
    </GlobalStyleComponent>
  );
};

export default Home;
