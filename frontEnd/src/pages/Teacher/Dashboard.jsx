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

import Schedule from './Schedule';
import Modules from './Modules';
import Classes from './Classes';
import Accounts from './Accounts';
import Profile from './Profile';
import logo from '/src/assets/mcalogo.png';
import Hero from '../../components/Widgets/Hero';

import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


const CalendarContainer = styled(Box)(({ theme }) => ({
  border: `2px var(--gray)`,
  boxShadow: theme.shadows[4],
  borderRadius: '8px',
  padding: theme.spacing(1),
  margin: '2px 10px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: 'auto',  
  [theme.breakpoints.up('xs')]: {
    maxWidth: '320px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '550px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '350px',
  },
}));

const TodoContainer = styled(Box)(({ theme }) => ({
  border: `2px var(--gray)`,
  boxShadow: theme.shadows[4],
  borderRadius: '8px',
  padding: theme.spacing(2),
  margin: '20px 10px 30px 0',
  width: '100%',
  textAlign: 'center',
  marginLeft: 'auto',  
  [theme.breakpoints.up('xs')]: {
    maxWidth: '320px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '550px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '350px',
  },
}));

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
  const [isLogoutPopover, setIsLogoutPopover] = useState(false); 

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
            Marychild Academy
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

      <Box component="main" sx={{ flexGrow: 1, pl: 3, mt: -5, ml: -23, bgcolor:'#fafafa' }}>
        <DrawerHeader />

        <Box sx={{ flexGrow: 1, }}>
        <Grid container spacing={2}>

        <Grid item xs={12} md={7} lg={8.3} sx={{ }}>
              {renderComponent()}
            </Grid>


            <Grid item xs={12} md={5} lg={3.7} >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CalendarContainer sx={{ bgcolor:'var(--wht)',
                 mr: {xs:'80px', sm:'80px', md:'10px', lg:'100px'}, 
                     padding: {
                      xs: '10px 1px',
                      sm: '10px 1px',
                      md: '30px 5px',
                      lg: '30px 3px',
                    }

                    

                }}>
                <Typography
  variant="h6"
  sx={{
    marginBottom: 1,
    fontSize: {
      xs: '30px',
      sm: '30px',
      md: '30px',
      lg: '30px',
    },
  }}
>
  Calendar
</Typography>



<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DateCalendar
    defaultValue={dayjs()}
    sx={{
      '.MuiPickersDay-root': {
        
        '&.Mui-selected': {
          backgroundColor: 'var(--pri)', 
          color: 'white',
        },
        '&.MuiPickersDay-today': {
          borderColor: 'var(--pri)', 
        },
        '&.MuiPickersDay-today.Mui-selected': {
          backgroundColor: 'var(--pri)', 
        },
      },
    }}
  />
</LocalizationProvider>
            </CalendarContainer>


            <TodoContainer sx={{ bgcolor:'var(--wht)',
            mr: {xs:'80px', sm:'80px', md:'10px', lg:'100px'}, 
                  padding: {
                    xs: '20px 5px',
                    sm: '20px 5px',
                    md: '30px 5px',
                    lg: '30px 3px',
                  }
                  
                }}>
                  <Typography variant="h6" sx={{ marginBottom: 1,
                    fontSize: {
                      xs: '30px',
                      sm: '30px',
                      md: '30px',
                      lg: '30px',
                    }
                   }}>
                    To Do List
                  </Typography>

              <List>
                <ListItem>
                  <ListItemText primary="To Grade" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Due assignments for Class A" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Due assignments for Class B" />
                </ListItem>
              </List>
            </TodoContainer>
            </Box>
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
    vertical: 'bottom', // Position the popover below the anchor element
    horizontal: 'right', // Align to the right of the anchor element
  }}
  transformOrigin={{
    vertical: 'top', // Align the top of the popover to the top of the anchor
    horizontal: 'right', // Align the right side of the popover to the right side of the anchor
  }}
>
  <Typography
    sx={{
      p: 1,
      bgcolor: 'var(--sec)',
      color: 'var(--wht)',
      textAlign: 'end', // Corrected from align to textAlign
    }}
  >
    {isLogoutPopover ? 'Logout' : hoverText}
  </Typography>
</Popover>

    </Box>
    </Box>
  );
};

export default Dashboard;


