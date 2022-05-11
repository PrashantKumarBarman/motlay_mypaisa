import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from './Link';

const drawerWidth = 240;
const routes = [
{ title: 'Book Tickets', path: '/book' },
{ title: 'View Tickets', path: '/' }
];

export default function Sidebar() {
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
                    {routes.map((route, index) => (
                    <ListItem button key={route.path}>
                        <Link to={`${route.path}`}>{route.title}</Link>
                    </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}