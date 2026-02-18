'use client';
import { useMemo, useState } from 'react';
import { useTheme, useMediaQuery, IconButton,Menu, Box, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Avatar, MenuItem } from '@mui/material';
import { Dashboard, ListAlt, Movie, TheaterComedy, Theaters, Menu  as MenuIcon } from '@mui/icons-material';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts';
const drawerWidth = 240;

const drawerItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Películas', icon: <Movie />, path: '/admin/movies' },
    { text: 'Salas', icon: <Theaters />, path: '/admin/theaters' },
    { text: 'Funciones', icon: <TheaterComedy />, path: '/admin/showtimes' },
    { text: 'Reservas', icon: <ListAlt />, path: '/admin/bookings' },
];



export default function AdminPage({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathName = usePathname();
    const theme = useTheme();
    const { user, logout } = useAuth();
    const router = useRouter();

    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
        router.push('/auth/login');
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

    const currentItem = useMemo(() => {
        return drawerItems.find(item => pathName.startsWith(item.path))
    }, [pathName]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: isTablet ? '100%' : `calc(100% - ${drawerWidth}px)`,
                      ml: isTablet ? 0 : `${drawerWidth}px` }}
            >
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                    {isTablet && (
                        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                        >
                        <MenuIcon/>
                        </IconButton>
                    )}

                    <Typography variant="h6" noWrap>
                        {currentItem ? currentItem.text : 'Admin Dashboard'}
                    </Typography>

                    <>
                        <Tooltip title="Abrir opciones">
                            <IconButton onClick={handleOpen} sx={{ p: 0, ml: 1 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                {getInitials(user?.displayName || user?.email)}
                            </Avatar>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                        <MenuItem key="logout" onClick={handleLogout}>
                            Cerrar Sesión
                        </MenuItem>
                        </Menu>
                        </>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant={isTablet ? "temporary" : "permanent"}
                open={isTablet ? mobileOpen : true}
                onClose={handleDrawerToggle}
            >
                <Toolbar />
                <Divider />
                <List>
                    {drawerItems.map((item, index) => (
                        <ListItem key={`${index}-${item.text}`} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={pathName.startsWith(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
