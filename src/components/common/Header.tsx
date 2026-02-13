'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Person, Logout, Menu as MenuIcon, ConfirmationNumber } from '@mui/icons-material';

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
  Avatar,
  Tooltip,
  Divider,
  ListItemIcon
} from '@mui/material';

interface HeaderProps {
  searchValue: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Header({ searchValue, onChangeSearch }: HeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    handleClose();
    await logout();
    router.push('/auth/login');
  };

  const navigateTo = (path: string) => {
    handleCloseUserMenu();
    handleClose();
    router.push(path);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const searchFieldStyles = {
    mr: 2,
    backgroundColor: '#ffffff26',
    borderRadius: '50px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      color: 'white',
      '& fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'text.secondary',
      opacity: 1,
    },
  };

  return (
    <AppBar position="static">
      <Typography variant="h3" sx={{ textAlign: 'center', paddingTop: '40px' }}>
        1. HOME CARTELERA
      </Typography>

      <Toolbar sx={{ display: 'flex' }}>
        <Box sx={{ cursor: 'pointer' }} onClick={() => router.push('/')}>
          <Typography variant="h6" >
            🎬  CINEMA TICKETS
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto', alignItems: 'center' }}>
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

          {user ? (
            <>
              <Tooltip title="Abrir opciones">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {getInitials(user.displayName || user.email)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {user.displayName || 'Usuario'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => navigateTo('/my-bookings')}>
                  <ListItemIcon><ConfirmationNumber fontSize="small" /></ListItemIcon>
                  Mis Reservas
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" startIcon={<Person />} onClick={() => router.push('/auth/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => router.push('/auth/register')}>
                Register
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
          <IconButton color="inherit" onClick={handleOpen}>
            {user ? (
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem', bgcolor: 'primary.main' }}>
                {getInitials(user.displayName || user.email)}
              </Avatar>
            ) : (
              <MenuIcon />
            )}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            {...menuProps}
          >
            {user ? (
              [
                <MenuItem key="reservas" onClick={() => navigateTo('/my-bookings')}>
                  Mis Reservas
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>
                  Cerrar Sesión
                </MenuItem>
              ]
            ) : (
              [
                <MenuItem key="login" onClick={() => navigateTo('/login')}>
                  Login
                </MenuItem>,
                <MenuItem key="register" onClick={() => navigateTo('/register')}>
                  Register
                </MenuItem>
              ]
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
