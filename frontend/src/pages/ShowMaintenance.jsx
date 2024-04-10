import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';

const Showmaintenance = () => {
  const [maintenances, setMaintenance] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/maintenances/${id}`)
      .then((response) => {
        setMaintenance(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div> {/* Navigation Bar */}
    <NavigationBar />

    <div style={styles.container}>
      
      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.productiondetails}>
          <h2 style={styles.title}>production Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {maintenances._id}
          </div>
          <div style={styles.infoItem}>
            <strong>machineNumber:</strong> {maintenances.machineNumber}
          </div>
          <div style={styles.infoItem}>
            <strong>machineName:</strong> {maintenances.machineName}
          </div>
          <div style={styles.infoItem}>
            <strong>description:</strong> {maintenances.description}
          </div>
          <div style={styles.infoItem}>
            <strong>maintenanceDate:</strong> {maintenances.maintenanceDate}
          </div>
          <div style={styles.infoItem}>
            <strong>frequencyInDays:</strong> {maintenances.frequencyInDays}
          </div>
         
          <div style={styles.infoItem}>
  <strong>Created At:</strong> {new Date(maintenances.createdAt).toLocaleString()}
</div>
<div style={styles.infoItem}>
  <strong>Updated At:</strong> {new Date(maintenances.updatedAt).toLocaleString()}
</div>

        </div>
      )}
    </div>
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

export default Showmaintenance;