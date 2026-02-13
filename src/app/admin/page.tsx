'use client';
import { useMemo, useState } from 'react';
import { useTheme, useMediaQuery, IconButton, Box, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, ListAlt, Movie, TheaterComedy, Theaters, Menu } from '@mui/icons-material';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
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

    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
                <Toolbar>
                    {isTablet && (
                        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                        >
                        <Menu/>
                        </IconButton>
                    )}

                    <Typography variant="h6" noWrap>
                        {currentItem ? currentItem.text : 'Admin Dashboard'}
                    </Typography>
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
