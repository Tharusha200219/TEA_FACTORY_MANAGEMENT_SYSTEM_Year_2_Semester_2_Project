import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles'; 
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({

    backgroundColor: '#138718',
    padding: '10px 20px', // Adjust padding here

    backgroundColor: '#3FC060',

});

const NavigationBar = () => {
    return (
        <StyledAppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between', padding: '1' }}>
                {/* Flex container for logo and company name */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Company logo */}
                    <img src="/images/logo.png" alt="Company Logo" style={{ height: '50px', marginRight: '10px' }} /> {/* Increase height here */}
                    {/* Company name */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '2rem' }}> {/* Increase font size here */}
                        Ever Green Tea
                    </Typography>
                </div>
                {/* Navigation buttons */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1rem', marginLeft: '10px' }}>Home</Button> {/* Adjust font size and margin here */}
                    <Button color="inherit" component={Link} to="/AboutUs" sx={{ fontSize: '1rem', marginLeft: '10px' }}>About</Button> {/* Adjust font size and margin here */}
                    <Button color="inherit" component={Link} to="/Service" sx={{ fontSize: '1rem', marginLeft: '10px' }}>Services</Button> {/* Adjust font size and margin here */}
                    <Button color="inherit" component={Link} to="/ContactUs" sx={{ fontSize: '1rem', marginLeft: '10px' }}>Contact</Button> {/* Adjust font size and margin here */}
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;
