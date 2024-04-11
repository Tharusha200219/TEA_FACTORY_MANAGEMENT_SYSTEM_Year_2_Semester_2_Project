import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.contactInfo}>
                <h3 style={styles.title}>Evergreen Tea Factory</h3>
                <div style={styles.contactDetails}>
                    <div>
                        <strong>Email:</strong> evergreen-tea@gmail.com
                    </div>
                    <div>
                        <strong>Phone:</strong> +94766738383
                    </div>
                    <div>
                        <strong>Location:</strong> 132/A Colombo, Sri Lanka
                    </div>
                </div>
            </div>
            <div style={styles.logo}>
                <h1 style={styles.logoText}>EVER GREEN TEA</h1>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#3FC060',
        color: '#fff',
        padding: '50px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactInfo: {
        textAlign: 'left',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    contactDetails: {
        fontSize: '16px',
    },
    logo: {},
    logoText: {
        fontSize: '36px',
    },
};

export default Footer;
