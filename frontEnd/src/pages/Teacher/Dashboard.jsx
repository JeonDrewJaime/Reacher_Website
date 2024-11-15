import React, { useState, useEffect } from 'react'; 
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Popover,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Schedule as ScheduleIcon,
  Class as ClassIcon,
  FolderOpen as ModuleIcon,
  People as AccountsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database'; // Realtime Database imports
import Schedule from './Schedule';
import Modules from './Modules';
import Classes from './Classes';
import Accounts from './Accounts';
import Profile from './Profile';
import logo from '/src/assets/mcalogo.png';
import Hero from '../../components/Widgets/Hero';
import TodoList from '../../components/Widgets/TodoList';
import Calendar from '../../components/Widgets/Calendar';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden', 
  ...(open && {
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      overflow: 'hidden', 
    },
  }),
  ...(!open && {
    '& .MuiDrawer-paper': {
      width: `calc(${theme.spacing(7)} + 1px)`,
      [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
      },
      overflow: 'hidden', 
    },
  }), 
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('dashboard');
  const [userRole, setUserRole] = useState(null); // State for user role
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverText, setHoverText] = useState('');
  const [isLogoutPopover, setIsLogoutPopover] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    // Clear session or auth-related data
    localStorage.removeItem('authToken');  // Optionally clear other session data

    // Redirect to the home page (or login page)
    navigate('/home');
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    
    // Listen for user authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, fetch their role from the Realtime Database
        const userRef = ref(db, 'users/' + user.uid); // Assuming users are stored in 'users' path
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const role = snapshot.val().role;
            setUserRole(role); // Set the role in state
          }
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      } else {
        // User is not signed in
        setUserRole(null);
      }
    });
  }, []);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'modules': return <Modules />;
      case 'classes': return <Classes />;
      case 'accounts': return <Accounts />;
      case 'profile': return <Profile />;
      default: 
        return (
          <>
            <Typography
              sx={{
                fontWeight: 'normal',
                color: 'var(--sec)',
                fontSize: { xs: '40px', sm: '40px', md: '50px', lg: '42px' },
                ml: {xs:'30px', sm:'30px', md:'50px', lg:'75px'}
              }}
            >
              Welcome, Admin!
            </Typography>

            <Typography
              sx={{
                fontWeight: 'normal',
                color: 'var(--gray)',
                fontSize: { xs: '25px', sm: '25px', md: '30px', lg: '20px' },
                ml: {xs:'30px', sm:'30px', md:'50px', lg:'80px'},
                mb: {xs:'30px', sm:'30px', md:'40px', lg:'20px'}
              }}
            >
              Have a good day!
            </Typography>

            <Hero />
          </>
        );
    }
  };

  const handlePopoverOpen = (event, text, isLogout = false) => {
    if (!open) { 
      setAnchorEl(event.currentTarget);
      setHoverText(text);
      setIsLogoutPopover(isLogout); 
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setHoverText('');
    setIsLogoutPopover(false); 
  };

  const openPopover = Boolean(anchorEl);

  return (
    <>
    <Box sx={{ display: 'flex', bgcolor:'#fafafa' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'var(--wht)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ color: 'var(--pri)', marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1, fontFamily: 'OneTrickPony, sans-serif', fontSize: '2rem', color: 'var(--pri)' }}>
            <img src={logo} alt="Logo" style={{ width: '27px', height: '25px', marginRight: '8px', marginTop: '10px' }} />
            Marychild Academy, Inc.
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { backgroundColor: 'var(--pri)', color: 'var(--wht)', display: 'flex', flexDirection: 'column' } }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--wht)' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ flexGrow: 1 }}>
          {['Dashboard', 'Modules', 'Classes', 'Profile'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onMouseEnter={(event) => handlePopoverOpen(event, text)}
                onMouseLeave={handlePopoverClose}
                onClick={() => setCurrentComponent(['dashboard', 'modules', 'classes', 'profile'][index])}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'var(--wht)',
                  '&:hover': { backgroundColor: 'rgba(153, 30, 86, 0.7)' },
                  '&.Mui-selected': { backgroundColor: 'rgba(153, 30, 86, 0.9)', color: 'var(--wht)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'var(--wht)' }}>
                  {index === 0 && <DashboardIcon />}
                  {index === 1 && <ModuleIcon />}
                  {index === 2 && <ClassIcon />}
                  {index === 3 && <AccountCircleIcon />}
                </ListItemIcon>

                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Conditionally render the "Accounts" button */}
          {userRole !== 'Teacher' && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setCurrentComponent('accounts')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color: 'var(--wht)',
                  '&:hover': { backgroundColor: 'rgba(153, 30, 86, 0.7)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'var(--wht)' }}>
                  <AccountsIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          )}

        </List>

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              color: 'var(--wht)',
              '&:hover': {
                backgroundColor: 'rgba(153, 30, 86, 0.7)', 
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: 'var(--wht)' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, pl: 3, mt: -6, ml: -26, bgcolor:'#fafafa'}}>
        <DrawerHeader />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} fullWidth>
            <Grid item xs={12} md={7} lg={9} sx={{ 
              background: '#faf1f9', 
              alignItems: 'center',
              justifyContent: 'center', 
            }}>
              {renderComponent()}
            </Grid>

            <Grid item xs={12} md={5} lg={3} sx={{ background: "#fdf8fc", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar />
              <TodoList />
            </Grid>
          </Grid>
        </Box>

        <Popover
          id={openPopover ? 'mouse-over-popover' : undefined}
          sx={{
            pointerEvents: 'none',
          }}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          disableRestoreFocus
          anchorOrigin={{
            vertical: 'bottom', 
            horizontal: 'right', 
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right', 
          }}
        >
          <Typography sx={{ p: 1, bgcolor: 'var(--sec)', color: 'var(--wht)', textAlign: 'end' }}>
            {isLogoutPopover ? 'Logout' : hoverText}
          </Typography>
        </Popover>
      </Box>
    </Box>
    </>
  );
};

export default Dashboard;
