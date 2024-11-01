import React, { useState } from 'react'; 
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
  Grid,
  Popover,
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

import Schedule from './Schedule';
import Modules from './Modules';
import Classes from './Classes';
import Accounts from './Accounts';
import Profile from './Profile';
import Calendar from '../../components/Widgets/Calendar.jsx'; // Import your Calendar component
import ToDoList from '../../components/Widgets/TodoList.jsx'; // Import your To Do List component
import logo from '/src/assets/mcalogo.png';
import Hero from '../../components/Widgets/Hero';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoverText, setHoverText] = useState('');

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    navigate('/home');
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'schedule': return <Schedule />;
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
                mb: {xs:'30px', sm:'30px', md:'40px', lg:'30px'}
              }}
            >
              Have a good day!
            </Typography>
            <Hero />
            <Typography
              sx={{
                fontWeight: '500',
                color: 'var(--blk)',
                fontSize: { xs: '25px', sm: '25px', md: '30px', lg: '30px' },
                ml: {xs:'30px', sm:'30px', md:'50px', lg:'80px'},
                mt: {xs:'30px', sm:'30px', md:'40px', lg:'50px'}
              }}
            >
              Modules
            </Typography>
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
  const id = openPopover ? 'simple-popover' : undefined;

  return (
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
          {['Dashboard', 'Schedule', 'Modules', 'Classes', 'Accounts', 'Profile'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onMouseEnter={(event) => handlePopoverOpen(event, text)}
                onMouseLeave={handlePopoverClose}
                onClick={() => setCurrentComponent(['dashboard', 'schedule', 'modules', 'classes', 'accounts', 'profile'][index])}
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
                  {index === 1 && <ScheduleIcon />}
                  {index === 2 && <ModuleIcon />}
                  {index === 3 && <ClassIcon />}
                  {index === 4 && <AccountsIcon />}
                  {index === 5 && <AccountCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} onMouseEnter={(event) => handlePopoverOpen(event, 'Logout', true)} onMouseLeave={handlePopoverClose}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'var(--wht)' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <DrawerHeader />
        
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Box>{renderComponent()}</Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ flex: 1, mb: 2 }}>
                <Calendar /> {/* Calendar Component */}
              </Box>
              <Box sx={{ flex: 1 }}>
                <ToDoList /> {/* To Do List Component */}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Typography sx={{ p: 1 }}>{hoverText}</Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default Dashboard;



