import React from 'react';
import NavigationBar from '../components/NavigationBar';

function Home() {
    const pageStyles = {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        color: '#333',
    };

    const headerStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const navStyles = {
        listStyleType: 'none',
    };

    const navItemStyles = {
        display: 'inline',
        marginRight: '20px',
    };

    const navLinkStyles = {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
    };

    const heroStyles = {
        backgroundImage: "url('./public/images/homebc.jpg')",
        backgroundSize: 'cover',
        color: 'white',
        fontSize: '16px',
        textAlign: 'center',
        padding: '100px 20px',
    };

    const heroHeaderStyles = {
        fontSize: '3em',
        marginBottom: '20px',
    };

    const heroParagraphStyles = {
        fontSize: '1.2em',
        marginBottom: '40px',
    };

    const btnStyles = {
        display: 'inline-block',
        backgroundColor: '#3FC060',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background-color 0.3s',
    };

    const btnHoverStyles = {
        backgroundColor: '#005f75',
    };

    const featureStyles = {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '50px 20px',
        backgroundColor: '#fff',
    };

    const featureItemStyles = {
        textAlign: 'center',
        maxWidth: '300px',
    };

    const featureHeaderStyles = {
        fontSize: '2em',
        marginBottom: '20px',
    };

    const featureImageStyles = {
        width: '100%', // Adjusted width to make images same size
        height: 'auto', // Maintain aspect ratio
        borderRadius: '10px',
        marginBottom: '20px',
    };

    const aboutStyles = {
        padding: '100px 20px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    };

    const aboutContentStyles = {
        maxWidth: '800px',
        margin: '0 auto',
    };

    const footerStyles = {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#333',
        color: '#fff',
    };

    const logoStyles = {
        maxHeight: '50px',
    };

    return (
        <div className="home-page" style={pageStyles}>

            <NavigationBar />


            <section className="hero" style={heroStyles}>
                <div className="hero-content">
                    <h1 style={heroHeaderStyles}>Welcome to Ever Green Tea Factory</h1>
                    <p style={heroParagraphStyles}>Your one-stop solution for managing tea production and distribution</p>
                    <a href="/HomePage" className="btn" style={btnStyles}>Discover More</a>
                </div>
            </section>

            <section id="features" className="features" style={featureStyles}>
                <div className="feature" style={featureItemStyles}>
                    <img src="./public/images/i.jpg" alt="Inventory Management" style={featureImageStyles} />
                    <h2 style={featureHeaderStyles}>Inventory Management</h2>
                    <p>Efficiently track your tea stock levels, purchases, and sales</p>
                </div>
                <div className="feature" style={featureItemStyles}>
                    <img src="./public/images/p.jpg" alt="Production Monitoring" style={featureImageStyles} />
                    <h2 style={featureHeaderStyles}>Production Monitoring</h2>
                    <p>Monitor the entire production process from harvest to packaging</p>
                </div>
                <div className="feature" style={featureItemStyles}>
                    <img src="./public/images/s.jpg" alt="Supplier Relations" style={featureImageStyles} />
                    <h2 style={featureHeaderStyles}>Supplier Relations</h2>
                    <p>Manage relationships with tea suppliers and ensure quality</p>
                </div>
            </section>

            <section id="about" className="about" style={aboutStyles}>
                <div className="about-content" style={aboutContentStyles}>
                    <h2>About Ever Green Tea</h2>
                    <p>Ever Green Tea is dedicated to bringing the finest teas from the garden to your cup. With our state-of-the-art management system, we ensure the quality and freshness of every leaf.</p>
                    <a href="/ContactUs" className="btn" style={btnStyles}>Contact Us</a>
                </div>
            </section>

            <footer className="footer" style={footerStyles}>
                <p>&copy; 2024 Ever Green Tea. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
