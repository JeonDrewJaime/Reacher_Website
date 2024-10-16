import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import FAQsIcon from '@mui/icons-material/QuestionAnswer';
import AboutIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import logo from '/src/assets/mcalogo.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Home from '../../pages/Home';
import Faqs from '../../pages/Faqs';
import About from '../../pages/About'; 
import { createGlobalStyle } from 'styled-components';
import OneTrickPonyFont from '../../assets/fonts/OneTrickPony.ttf';
import Button from '@mui/material/Button';
import Login from '../../pages/Login';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'OneTrickPony';
    src: url(${OneTrickPonyFont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: sans-serif;
  }
`;

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const iconMapping = {
  Home: <HomeIcon />,
  About: <AboutIcon />,
  FAQs: <FAQsIcon />,
  Login: <LoginIcon />,
};

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <GlobalStyles />
      <Box sx={{ display: 'flex', }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, color: 'black', ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontFamily: 'OneTrickPony, sans-serif',
                fontSize: '2.3rem',
                color: '#FE81B9',
              }}
            >
              <img src={logo} alt="Logo" style={{ width: '27px', height: '25px', marginRight: '8px', marginTop: '10px' }} />
              Marychild Academy
            </Typography>

            {!isMobile && (
    <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        minHeight: '40px', 
    }}>
        {['/home', '/about', '/faqs'].map((path) => (
            <ListItem key={path} disablePadding>
                <ListItemButton
                    component={Link}
                    to={path}
                    sx={{
                        color: isActive(path) ? '#45b6d4' : 'black',
                        backgroundColor: 'transparent',
                        fontFamily: 'sans-serif',
                        border: 'none',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        padding: { md: '20px 22px', lg: '20px 22px' },
                        fontSize: { md: '14px', lg: '15px' },
                        '&:hover': {
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: '4px',
                                backgroundColor: '#45b6d4',
                                transform: 'scaleX(1)',
                                transition: 'transform 0.3s ease',
                            },
                            transform: 'translateY(-2px)',
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: '4px',
                            backgroundColor: 'transparent',
                            transform: 'scaleX(0)',
                            transition: 'transform 0.3s ease',
                        },
                    }}
                >
                    {path === '/home' ? 'Home' : path === '/about' ? 'About' : 'FAQs'}
                </ListItemButton>
            </ListItem>
        ))}

        <Button
            sx={{
                outline: 'none',
                border: '1px solid transparent', 
                backgroundColor: '#45b6d4', 
                color: '#FFFFFF',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease',
                marginLeft: '15px',
                padding: {
                    xs: '6px 12px', 
                    sm: '8px 14px', 
                    md: '8px 20px', 
                    lg: '8px 40px', 
                },
                fontSize: {
                    xs: '10px',
                    sm: '11px', 
                    md: '12px', 
                    lg: '15px', 
                },
                '&:hover': {
                    backgroundColor: '#FE81B9', 
                    color: '#FFFFFF', 
                    border: '1px solid #FE81B9', 
                },
            }}
            component={Link}
            to="/login"
        >
            Login
        </Button>
    </Box>
)}

       
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
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Home', 'About', 'FAQs', 'Login'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                  <ListItemIcon>{iconMapping[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Main open={open}>
          <DrawerHeader />
         
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Main>
      </Box>
    </>
  );
}

