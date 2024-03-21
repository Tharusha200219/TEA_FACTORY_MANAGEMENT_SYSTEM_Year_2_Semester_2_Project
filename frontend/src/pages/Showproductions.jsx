import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';

const Showproductions = () => {
  const [productions, setProductions] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/productions/${id}`)
      .then((response) => {
        setProductions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={styles.container}>
      <BackButtonForCreateProduction />
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.productiondetails}>
          <h2 style={styles.title}>production Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {productions._id}
          </div>
          <div style={styles.infoItem}>
            <strong>schedule no:</strong> {productions.Schedule_no}
          </div>
          <div style={styles.infoItem}>
            <strong>Production_date:</strong> {productions.Production_date}
          </div>
          <div style={styles.infoItem}>
            <strong>Quantity:</strong> {productions.Quantity}
          </div>
          <div style={styles.infoItem}>
            <strong>Machine_assignment:</strong> {productions.Machine_assignment}
          </div>
          <div style={styles.infoItem}>
            <strong>shift_information:</strong> {new Date(productions.shift_information).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
  <strong>Created At:</strong> {new Date(productions.createdAt).toLocaleString()}
</div>
<div style={styles.infoItem}>
  <strong>Updated At:</strong> {new Date(productions.updatedAt).toLocaleString()}
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

export default Showproductions;