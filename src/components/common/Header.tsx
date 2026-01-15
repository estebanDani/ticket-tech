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
  const menuProps = {
    anchorOrigin: {
      vertical: 'bottom' as const,
      horizontal: 'right' as const,
    },
    transformOrigin: {
      vertical: 'top' as const,
      horizontal: 'right' as const,
    },
  };


  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
        <Typography variant="h3" sx={{textAlign: 'center', paddingTop:'40px'}}>
            1. HOME CARTELERA
        </Typography>

      <Toolbar sx={{display: 'flex'}}>
        <Box>
          <Typography variant="h6" >
            🎬  CINEMA TICKETS
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' },ml:'auto' } }>
          <Button color="inherit" startIcon={<PersonIcon />}>Login</Button>
          <Button color="inherit" >Register</Button>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, ml:'auto' }}>
          <IconButton color="inherit" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            {...menuProps}
          >
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Register</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
