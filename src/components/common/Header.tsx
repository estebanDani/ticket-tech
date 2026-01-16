'use client';
import PersonIcon from '@mui/icons-material/Person';
import {
  InputAdornment,
  TextField,
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
interface HeaderProps {
  searchValue: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ searchValue, onChangeSearch }: HeaderProps) {
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


  const searchFieldStyles = {
    mr: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '50px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      color: 'white',
      '& fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1,
    },
  };

  return (
    <AppBar position="static">
      <Typography variant="h3" sx={{ textAlign: 'center', paddingTop: '40px' }}>
        1. HOME CARTELERA
      </Typography>

      <Toolbar sx={{ display: 'flex' }}>
        <Box>
          <Typography variant="h6" >
            🎬  CINEMA TICKETS
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
          <TextField
            value={searchValue}
            onChange={onChangeSearch}
            placeholder='Buscar...'
            variant="outlined"
            size="small"
            sx={searchFieldStyles}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    🔍
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button color="inherit" startIcon={<PersonIcon />}>Login</Button>
          <Button color="inherit" >Register</Button>
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
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
