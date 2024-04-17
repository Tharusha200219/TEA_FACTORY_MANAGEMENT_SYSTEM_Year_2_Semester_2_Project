import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/backbutton';
import Spinner from '../components/Spinner';

const ShowInventory = () => {
  const [inventory, setInventory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/inventory/${id}`)
      .then((response) => {
        setInventory(response.data);
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
        <div style={styles.inventoryDetails}>
          <h2 style={styles.title}>Inventory Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {inventory._id}
          </div>
          <div style={styles.infoItem}>
            <strong>Batch ID:</strong> {inventory.batchid}
          </div>
          <div style={styles.infoItem}>
            <strong>Category:</strong> {inventory.category}
          </div>
          <div style={styles.infoItem}>
            <strong>Inventory Number:</strong> {inventory.inventorynumber}
          </div>
          <div style={styles.infoItem}>
            <strong>Quantity:</strong> {inventory.quantity}
          </div>
          <div style={styles.infoItem}>
            <strong>Created At:</strong> {new Date(inventory.createdAt).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
            <strong>Updated At:</strong> {new Date(inventory.updatedAt).toLocaleString()}
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
  inventoryDetails: {
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

export default ShowInventory;