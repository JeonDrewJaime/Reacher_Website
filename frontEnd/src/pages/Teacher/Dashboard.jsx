import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ClassIcon from '@mui/icons-material/Class';
import ModuleIcon from '@mui/icons-material/FolderOpen';
import Schedule from './Schedule';
import Modules from './Modules';
import Classes from './Classes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import logo from '/src/assets/mcalogo.png';

// Styled components
const CalendarContainer = styled(Box)(({ theme }) => ({
  border: `2px var(--gray)`,
  boxShadow: theme.shadows[4],
  borderRadius: '8px',
  padding: theme.spacing(1),
  margin: '2px 0',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginLeft: 'auto',  
  [theme.breakpoints.up('xs')]: {
    maxWidth: '500px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '750px',
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
  marginTop: '20px',
  marginBottom: '30px',
  width: '100%',
  textAlign: 'center',
  marginLeft: 'auto',  
  [theme.breakpoints.up('xs')]: {
    maxWidth: '500px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '750px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '350px',
  },
}));


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('dashboard');
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/home');
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 'schedule':
        return <Schedule />;
      case 'modules':
        return <Modules />;
      case 'classes':
        return <Classes />;
      default:
        return (
   
<Typography
variant="h2"
align="center"
sx={{
  marginBottom: '20px',
  fontFamily: 'OneTrickPony',
  fontWeight: 'normal',
  color: 'var(--sec)',
  marginTop: '2%',
  fontSize: {
    xs: '60px',
    sm: '60px',
    md: '60px'
  }
}}
data-aos="fade-up"
>
Welcome
</Typography>




        );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'var(--wht)' }}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color:'var(--pri)', marginRight: 5, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h4"
            noWrap
         
            sx={{
              flexGrow: 1,
              fontFamily: 'OneTrickPony, sans-serif',
              fontSize: '2rem',
              color:'var(--pri)'
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '27px', height: '25px', marginRight: '8px', marginTop: '10px' }} />
            Marychild Academy
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
  variant="permanent"
  open={open}
  PaperProps={{
    sx: {
      backgroundColor: 'var(--pri)', // Drawer background color
      color: 'var(--wht)', // Default text color for Drawer content
    },
  }}
>
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose} sx={{ color: 'var(--wht)' }}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton>
  </DrawerHeader>
  <List>
    {['Dashboard', 'Schedule', 'Modules', 'Classes'].map((text, index) => (
      <ListItem key={text} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          onClick={() =>
            setCurrentComponent(
              index === 0 ? 'dashboard' : index === 1 ? 'schedule' : index === 2 ? 'modules' : 'classes'
            )
          }
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            color: 'var(--wht)', // Button text color
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: 'var(--wht)', // Icon color
            }}
          >
            {index === 0 && <DashboardIcon />}
            {index === 1 && <ScheduleIcon />}
            {index === 2 && <ModuleIcon />}
            {index === 3 && <ClassIcon />}
          </ListItemIcon>
          <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>

  
  <ListItem
    disablePadding
    sx={{
      display: 'block',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    }}
  >
    <ListItemButton
      onClick={handleLogout}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        color: 'var(--wht)', // Logout button text color
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hover effect for logout button
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
          color: 'var(--wht)', // Logout icon color
        }}
      >
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
    </ListItemButton>
  </ListItem>
</Drawer>
      <Box component="main" sx={{ flexGrow: 1, pl: 3, mt: -4}}>
        <DrawerHeader />

        <Box sx={{ flexGrow: 1, }}>

          <Grid container spacing={2}>

          <Grid item xs={12} md={7} lg={8.3} sx={{border: 1, }}>
              {renderComponent()}
            </Grid>

            <Grid item xs={12} md={5} lg={3.7} >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CalendarContainer sx={{
                     padding: {
                      xs: '20px 5px',
                      sm: '20px 5px',
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
      sm: '35px',
      md: '25px',
      lg: '35px',
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
        // Style for all days
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

                <TodoContainer sx={{
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
                       sm: '35px',
                         md: '25px',
                           lg: '35px',
                    }
                   }}>
                    To Do List
                  </Typography>

                  <Typography>To Grade: Kindergarten</Typography>
                  <Typography>Assignments Due: Class 3B</Typography>
                </TodoContainer>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
