import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles'; 

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
                <Button color="inherit">Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Services</Button>
                <Button color="inherit">Contact</Button>
            </Toolbar>
        </StyledAppBar>
    );
};

export default NavigationBar;
