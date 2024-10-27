import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;

const images = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg"
];

function Hero(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const goToPreviousImage = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, 
          backgroundColor: "black"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx = {{color: "white"}}/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dynamic Hero Section with Navigation
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, position: 'relative' }}
      >
        <Toolbar />
        
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '400px',
            width: '100%',
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
          }}
        >
          {/* Left Arrow */}
          <IconButton
            sx={{ position: 'absolute', top: '50%', left: '20px', color: 'white', zIndex: 10 }}
            onClick={goToPreviousImage}
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            sx={{ position: 'absolute', top: '50%', right: '20px', color: 'white', zIndex: 10 }}
            onClick={goToNextImage}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Caption */}
          <Box sx={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '10px', borderRadius: '5px' }}>
            <Typography variant="h4">Beautiful Dynamic Hero</Typography>
            <Typography variant="subtitle1">Image {currentImageIndex + 1} of {images.length}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;