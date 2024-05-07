import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backbuttonwaste';
import Spinner from '../components/Spinner';

const ShowWaste = () => {
  const [waste, setWaste] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/waste/${id}`)
      .then((response) => {
        setWaste(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles.container}>
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.wasteDetails}>
          <h2 style={styles.title}>Waste Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {waste._id}
          </div>
          <div style={styles.infoItem}>
            <strong>Waste ID:</strong> {waste.wasteid}
          </div>
          <div style={styles.infoItem}>
            <strong>Tea Type:</strong> {waste.teatype}
          </div>
          <div style={styles.infoItem}>
            <strong>Inventory Number:</strong> {waste.inventorynumber}
          </div>
          <div style={styles.infoItem}>
            <strong>Quantity:</strong> {waste.quantity}
          </div>
          <div style={styles.infoItem}>
            <strong>Date Recorded:</strong> {new Date(waste.dateRecorded).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
            <strong>Created At:</strong> {new Date(waste.createdAt).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
            <strong>Updated At:</strong> {new Date(waste.updatedAt).toLocaleString()}
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
  wasteDetails: {
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

export default ShowWaste;