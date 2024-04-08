import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles'; 
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#06C167',
});

const NavigationBar = () => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                    
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ever Green Tea
                </Typography>
                <Button color="inherit" component={Link} to="/" >Home</Button>
                <Button color="inherit" component={Link} to="/AboutUs">About</Button>
                <Button color="inherit" component={Link} to="/">Services</Button>
                <Button color="inherit" component={Link} to="/ContactUs">Contact</Button>
                
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;
