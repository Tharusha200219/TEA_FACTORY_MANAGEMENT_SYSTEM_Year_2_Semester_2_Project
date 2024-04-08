import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const ShowSupplier = () => {
    const [supplier, setSupplier] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/suppliers/${id}`)
            .then((response) => {
                setSupplier(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    return (
        <div style={styles.container}>
            {/* <BackButton/> */}
            {loading ? (
                <Spinner />
            ) : (
                <div style={styles.supplierDetails}>
                    <h2 style={styles.title}>Supplier Details</h2>
                    <div style={styles.infoItem}>
                        <strong>ID:</strong> {supplier._id}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Supplier ID:</strong> {supplier.supplierid}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Name:</strong> {supplier.name}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Address:</strong> {supplier.address}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>ContactNo:</strong> {supplier.contact}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Created At:</strong> {new Date(supplier.createdAt).toLocaleString()}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Updated At:</strong> {new Date(supplier.updatedAt).toLocaleString()}
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
    supplierDetails: {
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

export default ShowSupplier;
