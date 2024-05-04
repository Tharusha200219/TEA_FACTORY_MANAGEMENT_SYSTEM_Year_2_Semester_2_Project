import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles'; 
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#138718',
});

const NavigationBar = () => {
    return (
        <StyledAppBar position="static">
            <Toolbar style={{ justifyContent: 'space-between' }}>
                {/* Flex container for logo and company name */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Company logo */}
                    <img src="/images/logo.png" alt="Company Logo" style={{ height: '40px', marginRight: '10px' }} />
                    {/* Company name */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Ever Green Tea
                    </Typography>
                </div>
                {/* Navigation buttons */}
                <div>
                    <Button color="inherit" component={Link} to="/" >Home</Button>
                    <Button color="inherit" component={Link} to="/AboutUs">About</Button>
                    <Button color="inherit" component={Link} to="/Service">Services</Button>
                    <Button color="inherit" component={Link} to="/ContactUs">Contact</Button>
                </div>
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;
