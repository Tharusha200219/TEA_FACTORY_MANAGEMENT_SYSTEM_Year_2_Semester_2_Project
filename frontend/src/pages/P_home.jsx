import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from '../components/NavigationBar';

const P_home = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const modeStyle = darkMode ? darkStyles : lightStyles;
  const icon = darkMode ? faSun : faMoon;

  return (
    <div className="home-page" style={{...modeStyle.homePage}}>
      <NavigationBar />
    

      <div className="button-container" style={{...styles.buttonContainer, marginBottom: '20px', textAlign: 'center'}}>
        <Link to="/Productionhome">
          <button className="button" style={{...modeStyle.button, ...styles.button}}>Production Schedule</button>
        </Link>
        <Link to="/Teatypehome">
          <button className="button" style={{...modeStyle.button, ...styles.button}}>Tea Type</button>
        </Link>
      </div>
    </div>
  );
};

const lightStyles = {
  homePage: {
    color: '#000',
    backgroundColor: '#fff',
    backgroundImage: `url('./public/images/production_bc_light.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the content fills the entire viewport height
    display: 'flex', // Remove flex properties
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '8px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    margin: '0 10px',
  },
};

const darkStyles = {
  homePage: {
    color: '#fff',
    backgroundColor: '#333',
    backgroundImage: `url('./public/images/production_bc_dark.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure the content fills the entire viewport height
    display: 'flex', // Remove flex properties
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '8px',
    boxShadow: '2px 2px 5px rgba(255, 255, 255, 0.2)',
    margin: '0 10px',
  },
};

const styles = {
  buttonContainer: {
    marginTop: '20px',
  },
};

export default P_home;
