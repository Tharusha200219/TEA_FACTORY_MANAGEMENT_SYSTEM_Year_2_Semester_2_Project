import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import { MdOutlineAddBox } from 'react-icons/md';
import VehiclesTable from '../components/home/VehiclesTable';
import VehiclesCard from '../components/home/VehiclesCard';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const GlobalStyleComponent = styled.div`
  .container {
    height: 100vh;
    padding: '60px',
    max-width: 1200px;
    margin: 0 auto;

   
    background-image: url("./public/images/images.jpeg");

    background-color: Black;

    background-size: cover;
    background-position: center;
    /* Apply blur effect */
    filter: blur(0.000005px);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    color: white;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

  .button {
    padding: 0.5rem 1rem;
    background-color: #63b3ed;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #4f94cd;
    }
  }

  .spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
  }

  .table-container {
    margin-top: 2rem;
    color: white;
    border-color:white;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2rem;
    margin-top: 2rem;
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

  a.active {
    background-color: #333;
    color: #fff;
  }
`;

const Home = () => {
  const location = useLocation(); // Use useLocation hook to get current location
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showType, setShowType] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('VehicleList'); // State to track active page

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
      <SecondaryNavbar>
        <Link to="/vehicles/create">Add New Vehicle</Link>
        <Link to="/AvailableVehicles" className={location.pathname === '/AvailableOrders' ? 'active' : ''}>
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
      </SecondaryNavbar>
      <div className="container p-4">
        <div className="header">
          <h1 className="text-3xl font-semibold text-white-800">Vehicles List</h1>
          <input
            type="text"
            placeholder="Search Vehicles..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <div className="table-container">
            <VehiclesTable vehicles={filteredVehicles} />
          </div>
        ) : (
          <div className="card-container">
            <VehiclesCard vehicles={filteredVehicles} />
          </div>
        )}
      </div>
      <Footer />
    </GlobalStyleComponent>
  );
};

export default Home;
