import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackButtonForCreateProduction from '../components/backbutton_for_create_production';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';

const Showteatypes = () => {
  const [teatypes, setTeatypes] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/teatypes/${id}`)
      .then((response) => {
        setTeatypes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <NavigationBar />
      <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
        <div className="container mx-auto">
          <div className="mx-auto flex justify-center items-center">
            <div className="flex space-x-4">
              <Link to="/P_home" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/Teatypehome" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
              <Link to="/teatypes/creates" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
              <Link to="/pending-shipments" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
              <Link to="/TeaTypeReport" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
            </div>
          </div>
        </div>
      </nav>
      <div style={styles.container}>
        <BackButtonForCreateProduction />
        {loading ? (
          <Spinner />
        ) : (
          <div style={styles.productionDetails}>
            <h2 style={styles.title}>Tea Types Details</h2>
            <div style={styles.infoItem}>
              <strong>ID:</strong> {teatypes._id}
            </div>
            <div style={styles.infoItem}>
              <strong>Schedule No:</strong> {teatypes.Schedule_no}
            </div>
            <div style={styles.infoItem}>
              <strong>Black Tea:</strong> {teatypes.black_tea}
            </div>
            <div style={styles.infoItem}>
              <strong>Green Tea:</strong> {teatypes.green_tea}
            </div>
            <div style={styles.infoItem}>
              <strong>Oolong Tea:</strong> {teatypes.oolong_tea}
            </div>
            <div style={styles.infoItem}>
              <strong>White Tea:</strong> {teatypes.white_tea}
            </div>
            <div style={styles.infoItem}>
              <strong>Tea Wastage:</strong> {teatypes.tea_wastage}
            </div>
            <div style={styles.infoItem}>
              <strong>Created At:</strong> {new Date(teatypes.createdAt).toLocaleString()}
            </div>
            <div style={styles.infoItem}>
              <strong>Updated At:</strong> {new Date(teatypes.updatedAt).toLocaleString()}
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
  productionDetails: {
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

export default Showteatypes;
