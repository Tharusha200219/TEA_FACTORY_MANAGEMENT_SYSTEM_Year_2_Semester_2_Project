import React, { useEffect, useState } from 'react';
import BackButtonOrder from '../components/backbuttonOrder';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const ShowOrder = () => {
  const [Order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);
  return (
    <div style={styles.container}>
      <BackButtonOrder />

      {loading ? (
        <Spinner />
      ) : (
        <div style={styles.orderdetails}>
          <h2 style={styles.title}>Order Details</h2>
          <div style={styles.infoItem}>
            <strong>ID:</strong> {Order.orderno}
          </div>
          <div style={styles.infoItem}>
            <strong>DueDate:</strong> {Order.duedate}
          </div>
          <div style={styles.infoItem}>
            <strong>Quantity:</strong> {Order.quantity}
          </div>
          <div style={styles.infoItem}>
            <strong>Category:</strong> {Order.category}
          </div>

          <div style={styles.infoItem}>
            <strong>Created At:</strong> {new Date(Order.createdAt).toLocaleString()}
          </div>
          <div style={styles.infoItem}>
            <strong>Updated At:</strong> {new Date(Order.updatedAt).toLocaleString()}
          </div>

        </div>


      )}
    </div>
  )
};
const styles = {
  container: {
    padding: '20px',
    background: '#f4f4f4',
    minHeight: '100vh',
  },
  orderdetails: {
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



export default ShowOrder;