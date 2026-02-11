'use client';

import { Box, Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, ListAlt, Movie, TheaterComedy, Theaters } from '@mui/icons-material';
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

    const currentItem = drawerItems.find(item => pathName.startsWith(item.path));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
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
                variant="permanent"
                anchor="left"
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
