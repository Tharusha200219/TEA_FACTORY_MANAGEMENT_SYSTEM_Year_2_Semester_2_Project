import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButtonSupplyRecords from '../components/backbtnSupplyRecordTable';

const ShowSupplyRecord = () => {
    const [supplyRecord, setSupplyRecord] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/supplyrecords/${id}`)
            .then((response) => {
                setSupplyRecord(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);
    
    return (
        <div style={styles.container}>
            <div className='m-5'>
                <BackButtonSupplyRecords/>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <div style={styles.supplyRecordDetails}>
                    <h2 style={styles.title}>Supply Record</h2>
                    <div style={styles.infoItem}>
                        <strong>ID:</strong> {supplyRecord._id}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Supplier:</strong> {supplyRecord.supplier}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Date:</strong> {supplyRecord.date}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Quantity(Kg):</strong> {supplyRecord.quantity}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Unitprice (Rs):</strong> {supplyRecord.unitPrice}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Created At:</strong> {new Date(supplyRecord.createdAt).toLocaleString()}
                    </div>
                    <div style={styles.infoItem}>
                        <strong>Updated At:</strong> {new Date(supplyRecord.updatedAt).toLocaleString()}
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        background: '#f4f4f4',
        minHeight: '100vh',
    },
    supplyRecordDetails: {
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

export default ShowSupplyRecord;
