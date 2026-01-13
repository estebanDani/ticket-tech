'use client';
import PersonIcon from '@mui/icons-material/Person';


import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
        <Typography variant="h3" sx={{textAlign: 'center', marginTop:'40px'}}>
            1. HOME CARTELERA
        </Typography>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         🎬  CINEMA TICKETS
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color="inherit" startIcon={<PersonIcon />}>Login</Button>
          <Button color="inherit" >Register</Button>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Register</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
