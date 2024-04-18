import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import styled from 'styled-components';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const GlobalStyleComponent = styled.div`
  .container {
    height: 100vh;
    padding: '60px',
    max-width: 1200px;
    margin: 0 auto;
   
    background-image: url("./public/images/th676.jpg");
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
`;

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to generate report
  const generateReport = () => {
    // Logic to generate report based on filteredBooks
    // For simplicity, let's create a comma-separated string of book titles and log it
    const report = filteredBooks.map(book => book.title).join(', ');
    console.log("Generating report...");
    console.log("Report:", report);
  };

  return (
    <GlobalStyleComponent>
      <NavigationBar />
      <SecondaryNavbar>
        <Link to="/books/create">Add New Vehicle</Link>
        <Link to="/AvailableVehicles">Available Vehicles</Link>
        <Link to="/orders">View Orders</Link>
        <Link to="/ReportVehicle" onClick={generateReport}>Generate Report</Link> {/* Call generateReport when the link is clicked */}
      </SecondaryNavbar>
      <div className='container p-4'>
        <div className='header'>
          <h1 className='text-3xl font-semibold text-white-800'>Vehicles List</h1>
          <input
            type="text"
            placeholder="Search Vehicles..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        {loading ? (
          <div className='spinner-container'>
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <div className='table-container'>
            <BooksTable books={filteredBooks} />
          </div>
        ) : (
          <div className='card-container'>
            <BooksCard books={filteredBooks} />
          </div>
        )}
        
      </div>
      <Footer />
    </GlobalStyleComponent>
  );
};

export default Home;
