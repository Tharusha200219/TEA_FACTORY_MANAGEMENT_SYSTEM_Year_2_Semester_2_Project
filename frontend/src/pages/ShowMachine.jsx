import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';

const Showmachine = () => {
  const [machines, setMachine] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/machines/${id}`)
      .then((response) => {
        setMachine(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles.container}>
      
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.productiondetails}>
          <h2 style={styles.title}>Machine Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {machines._id}
          </div>
          <div style={styles.infoItem}>
            <strong>machineNumber:</strong> {machines.machineNumber}
          </div>
          <div style={styles.infoItem}>
            <strong>machineName:</strong> {machines.machineName}
          </div>
          <div style={styles.infoItem}>
            <strong>machineType:</strong> {machines.machineType}
          </div>
          <div style={styles.infoItem}>
            <strong>installationDate:</strong> {machines.installationDate}
          </div>
          <div style={styles.infoItem}>
            <strong>warrentyInformation:</strong> {machines.warrentyInformation}
          </div>
         
          <div style={styles.infoItem}>
  <strong>Created At:</strong> {new Date(machines.createdAt).toLocaleString()}
</div>
<div style={styles.infoItem}>
  <strong>Updated At:</strong> {new Date(machines.updatedAt).toLocaleString()}
</div>

        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    background: '#f4f4f4',
    minHeight: '100vh',
  },
  productiondetails: {
    marginTop: '20px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  infoItem: {
    marginBottom: '10px',
    fontSize: '16px',
  },
};

export default Showmachine;