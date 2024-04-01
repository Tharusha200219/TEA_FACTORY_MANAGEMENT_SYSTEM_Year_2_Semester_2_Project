import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Production = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const modeStyle = darkMode ? darkStyles : lightStyles;

  return (
    <div className="home-page" style={modeStyle.homePage}>
      <header style={styles.header}>
        <h1>Welcome to Tea Production</h1>
        <button className="toggle-button" onClick={toggleMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="button-container" style={styles.buttonContainer}>
        <Link to="/production-schedule">
          <button className="button" style={modeStyle.button}>Production Schedule</button>
        </Link>
        <Link to="/tea-type">
          <button className="button" style={modeStyle.button}>Tea Type</button>
        </Link>
      </div>
    </div>
  );
}

const lightStyles = {
  homePage: {
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
};

const darkStyles = {
  homePage: {
    color: '#fff',
    backgroundColor: '#333',
  },
  button: {
    backgroundColor: '#333',
    color: '#fff',
  },
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
};

export default Production;
