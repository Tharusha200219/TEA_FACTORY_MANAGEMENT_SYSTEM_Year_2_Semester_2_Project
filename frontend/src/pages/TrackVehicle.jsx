import { useState, useEffect } from 'react';

function Track() {
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [userAddress, setUserAddress] = useState();

    const [destinationLatitude, setDestinationLatitude] = useState(40.7128); // Default destination latitude (New York City)
    const [destinationLongitude, setDestinationLongitude] = useState(-74.0060); // Default destination longitude (New York City)
    const [animationPercentage, setAnimationPercentage] = useState(0);

    useEffect(() => {
        const geo = navigator.geolocation;

        // Get current position for user's location
        geo.getCurrentPosition(userCoords);
        function userCoords(position) {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            setLatitude(userLatitude);
            setLongitude(userLongitude);
        }
    }, []); // Empty dependency array to run effect only once

    const getUserAddress = async () => {
        const url = `https://api.opencagedata.com/geocode/v1/json?key=61e529e1541443e9a44fd28dfa800517&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
        const response = await fetch(url);
        const data = await response.json();
        setUserAddress(data.results[0].formatted);
    };

    const handleGetUserAddress = () => {
        getUserAddress();
    };

    // Function to start the animation
    const startAnimation = () => {
        let percentage = 0;
        const animationInterval = setInterval(() => {
            percentage += 1; // Adjust the speed of animation by changing this value
            if (percentage > 100) {
                percentage = 0; // Reset to start position
            }
            setAnimationPercentage(percentage);
        }, 100); // Change the interval for smoother or faster animation
    };

    useEffect(() => {
        startAnimation();
    }, []); // Empty dependency array to run effect only once

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h1 style={styles.heading}>Current Location</h1>
                <div style={styles.coordinates}>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
                <button style={styles.button} onClick={handleGetUserAddress}>Get User Address</button>
                <hr style={styles.hr} />
            </div>
            
            <div style={styles.section}>
                <h1 style={styles.heading}>User Address</h1>
                <p style={styles.address}>{userAddress}</p>
                <hr style={styles.hr} />
            </div>

            <div style={styles.section}>
                <h1 style={styles.heading}>Tracking</h1>
                <div style={{...styles.mapContainer, backgroundImage: 'url(./public/images/map.jpg)'}}>
                    <div style={{ ...styles.marker, top: `${animationPercentage}%`, left: `${animationPercentage}%` }}>🚚</div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    section: {
        marginBottom: '20px',
    },
    heading: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '10px',
    },
    coordinates: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    hr: {
        border: 'none',
        borderBottom: '1px solid #ccc',
        marginBottom: '20px',
    },
    address: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '10px',
    },
    mapContainer: {
        position: 'relative',
        width: '300px',
        height: '300px',
        backgroundColor: '#ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    marker: {
        position: 'absolute',
        width: '20px',
        height: '20px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '20px',
        color: '#fff',
    },
};

export default Track;
