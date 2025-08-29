import { Drawer, Toolbar, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItem component={Link} to="/">
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/users">
                        <ListItemText primary="Usuarios" />
                    </ListItem>          
                    <ListItem component={Link} to="/products">
                        <ListItemText primary="Productos" />
                    </ListItem>
                    <ListItem component={Link} to="/banners">
                        <ListItemText primary="Banners" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
