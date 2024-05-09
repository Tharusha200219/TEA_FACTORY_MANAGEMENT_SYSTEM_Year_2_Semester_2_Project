import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import NavigationBar from '../components/NavigationBar';

const Showmaintenance = () => {
    const [maintenance, setMaintenance] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Fetch maintenance data
        axios.get(`http://localhost:5555/maintenances/${id}`)
            .then((response) => {
                setMaintenance(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch maintenance data.');
                setLoading(false);
            });
    }, [id]);

    return (
        <div style={styles.wrapper}>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Secondary Navigation Bar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MaintenanceHome" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                        <Link to="/maintenances/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                        <Link to="/MaintenanceReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={styles.container}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div style={styles.error}>
                        {error}
                    </div>
                ) : (
                    <div style={styles.maintenanceDetails}>
                        <h2 style={styles.title}>Maintenance Details</h2>
                        <div style={styles.details}>
                            <div style={styles.infoItem}>
                                <strong>ID:</strong> {maintenance._id}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Machine Number:</strong> {maintenance.machineNumber}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Machine Name:</strong> {maintenance.machineName}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Description:</strong> {maintenance.description}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Maintenance Date:</strong> {new Date(maintenance.maintenanceDate).toLocaleDateString()}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Frequency In Days:</strong> {maintenance.frequencyInDays}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Created At:</strong> {new Date(maintenance.createdAt).toLocaleString()}
                            </div>
                            <div style={styles.infoItem}>
                                <strong>Updated At:</strong> {new Date(maintenance.updatedAt).toLocaleString()}
                            </div>
                             {/* Add Back button */}
                        <div className="mt-6">
                            <Link to="/MaintenanceHome" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Back
                            </Link>
                        </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    container: {
        flex: 1,
        padding: '20px',
        background: '#f4f4f4',
    },
    maintenanceDetails: {
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
    details: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    infoItem: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
    },
    error: {
        color: 'red',
        fontSize: '18px',
        textAlign: 'center',
    },
};

export default Showmaintenance;
