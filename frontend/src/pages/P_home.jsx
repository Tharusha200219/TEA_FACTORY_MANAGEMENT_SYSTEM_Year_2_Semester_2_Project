import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const P_home = () => {
  return (
    <div>
      <NavigationBar />
      <div style={styles.background}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>Production Planning and Scheduling</h1>
          </header>
          <main style={styles.main}>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Welcome to Production Planning and Scheduling System!</h2>
              <p style={styles.sectionDescription}>
                Welcome to the production planning and scheduling system. Our system helps streamline tea factory production process, optimize resource allocation, and improve overall efficiency.
              </p>
            </section>
            <section style={styles.section}>
              <h2 style={styles.sectionTitle}>Key Features</h2>
              <div style={styles.featureList}>
              <div style={styles.feature}>
                  <img src="./public/images/production.jpg" alt="Feature 2" style={styles.featureImage} />
                  <h3 style={styles.featureTitle}>Production Scheduling</h3>
                  <p style={styles.featureDescription}>Plan and schedule production tasks dynamically to meet demand while minimizing idle time and maximizing throughput.</p>
                  <Link to="/Productionhome" style={styles.btn}>ADD PRODUCTION SCHEDULE</Link>
                </div>
                <div style={styles.feature}>
                  <img src="./public/images/tea_type.jpg" alt="Feature 1" style={styles.featureImage} />
                  <h3 style={styles.featureTitle}>Tea Type Management</h3>
                  <p style={styles.featureDescription}>Efficiently manage Tea types,.</p>
                  <Link to="/Teatypehome" style={styles.btn}>ADD TEA TYPES</Link>
                </div>
                
                {/* Add more features as needed */}
              </div>
            </section>
          </main>
          
        </div>
        <Footer />
      </div>
      
    </div>
  );
};

export default P_home;

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
  btnPrimary: {
    backgroundColor: '#007bff',
  },
  btnHover: {
    backgroundColor: '#0056b3',
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
    width: '100%',
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
};
