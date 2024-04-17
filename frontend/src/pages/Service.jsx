import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ServicePage = () => {
    return (
        <div>
        <NavigationBar />
        <div style={styles.container}>
            <h1 style={styles.heading}>Our Services</h1>
            <div style={styles.serviceContainer}>
                <div style={styles.serviceCard}>
                    <img src="./public/images/pr.jpg" alt="Inventory Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Inventory Management</h2>
                    <p style={styles.serviceDescription}>Efficiently manage your tea inventory with our advanced inventory management system.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/or.jpg" alt="Order Processing and Fulfillment" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Order Processing and Fulfillment</h2>
                    <p style={styles.serviceDescription}>Streamline your order processing and ensure timely fulfillment with our robust system.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/ve.jpg" alt="Vehicle Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Vehicle Management</h2>
                    <p style={styles.serviceDescription}>Optimize your transportation logistics with our comprehensive vehicle management solution.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/su.jpg" alt="Supplier Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Supplier Management</h2>
                    <p style={styles.serviceDescription}>Manage your tea suppliers efficiently and maintain strong relationships with our supplier management tools.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/ma.jpg" alt="Machine and Maintenance Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Machine and Maintenance Management</h2>
                    <p style={styles.serviceDescription}>Ensure the smooth operation of your tea processing equipment with our advanced management system.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/pr.jpg" alt="Production Planning and Scheduling" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Production Planning and Scheduling</h2>
                    <p style={styles.serviceDescription}>Plan and schedule your tea production effectively to meet demand and optimize resources.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/emp.jpg" alt="Employee Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Employee Management</h2>
                    <p style={styles.serviceDescription}>Efficiently manage your workforce and enhance productivity with our employee management tools.</p>
                </div>
                <div style={styles.serviceCard}>
                    <img src="./public/images/pa.jpg" alt="Payment Management" style={styles.serviceImage} />
                    <h2 style={styles.serviceTitle}>Payment Management</h2>
                    <p style={styles.serviceDescription}>Streamline your payment processes and keep track of financial transactions seamlessly.</p>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        backgroundColor: '#f0f0f0',
    },
    heading: {
        fontSize: '32px',
        marginBottom: '2px',
        color: '#333',
    },
    serviceContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    serviceCard: {
        width: '300px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        textAlign: 'center',
    },
    serviceImage: {
        width: '100%',
        height: '200px',
        borderRadius: '10px 10px 0 0',
    },
    serviceTitle: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '10px',
    },
    serviceDescription: {
        fontSize: '16px',
        color: '#666',
    },
};

export default ServicePage;
