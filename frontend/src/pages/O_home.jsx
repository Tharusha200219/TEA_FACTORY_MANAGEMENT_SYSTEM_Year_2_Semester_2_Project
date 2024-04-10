import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const O_home = () => {
    return (
        <div>
            <NavigationBar />
            <div style={styles.background}>
                <div style={styles.container}>
                    <header style={styles.header}>
                        <h1 style={styles.title}>Order Processing and Fulfillment</h1>
                    </header>
                    <main style={styles.main}>
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Welcome to Order Processing and Fulfillment System!</h2>
                            <p style={styles.sectionDescription}>
                                Welcome to the order processing and fulfillment system. Our system helps streamline order processing, manage inventory, and improve overall customer satisfaction.
                            </p>
                        </section>
                        <section style={styles.section}>
                            <h2 style={styles.sectionTitle}>Key Features</h2>
                            <div style={styles.featureList}>
                                <div style={styles.feature}>
                                    <img src="./public/images/order.jpg" alt="Feature 1" style={styles.featureImage} />
                                    <h3 style={styles.featureTitle}>Order Processing</h3>
                                    <p style={styles.featureDescription}>Efficiently manage incoming orders and process them for fulfillment.</p>
                                    <Link to="/OrderHome" style={styles.btn}>Process Orders</Link>
                                </div>
                                
                               
                            </div>
                        </section>
                    </main>
                    <footer style={styles.footer}>
                        <p style={styles.footerText}>© {new Date().getFullYear()} Order Processing and Fulfillment</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

const styles = {
    background: {
        backgroundImage: 'url("./public/images/production-background.jpg")', // Replace with the path to your background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    },
    container: {
        maxWidth: '960px',
        margin: '0 auto',
        padding: '20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#333',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    section: {
        marginBottom: '40px',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        marginBottom: '20px',
    },
    sectionDescription: {
        fontSize: '1.1rem',
        color: '#555',
        marginBottom: '20px',
    },
    btn: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
    },
    featureList: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    feature: {
        flex: '1 1 300px',
        marginRight: '20px',
        marginBottom: '20px',
    },
    featureImage: {
        width: '40%',
        borderRadius: '5px',
    },
    featureTitle: {
        fontSize: '1.2rem',
        marginTop: '10px',
    },
    featureDescription: {
        color: '#555',
    },
    footer: {
        marginTop: '40px',
        textAlign: 'center',
        color: '#777',
    },
    footerText: {
        fontSize: '0.9rem',
    },
};

export default O_home;
