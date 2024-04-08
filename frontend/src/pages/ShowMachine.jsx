import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowMachine = () => {
  const [machine, setMachine] = useState({});
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
        console.error('Error fetching machine:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.machineDetails}>
          <h2 style={styles.title}>Machine Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {machine._id}
          </div>
          <div style={styles.infoItem}>
            <strong>Machine Number:</strong> {machine.machineNumber}
          </div>
          <div style={styles.infoItem}>
            <strong>Machine Name:</strong> {machine.machineName}
          </div>
          <div style={styles.infoItem}>
            <strong>Machine Type:</strong> {machine.machineType}
          </div>
          <div style={styles.infoItem}>
            <strong>Installation Date:</strong> {machine.installationDate}
          </div>
          <div style={styles.infoItem}>
            <strong>Warranty Information:</strong> {machine.warrantyInformation}
          </div>
          <div style={styles.infoItem}>
            <strong>Created At:</strong> {new Date(machine.createdAt).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
            <strong>Updated At:</strong> {new Date(machine.updatedAt).toLocaleString()}
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
  machineDetails: {
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

export default ShowMachine;
