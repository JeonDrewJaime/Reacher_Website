import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';

const images = [img3, img2, img1];

const OuterContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--light-gray)`,
  backgroundColor: 'var(--wht)',
  padding: '20px',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '40px auto',
  width: 'auto',        
  [theme.breakpoints.up('xs')]: {
    maxWidth: '450px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '700px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '480px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1100px',
  },   
}));

const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#f0f0f0',  
  width: '100%',        
  [theme.breakpoints.up('xs')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '320px',
  },
  [theme.breakpoints.up('md')]: {
    minHeight: '200px',
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '500px',
  },    
}));

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const goToPreviousImage = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNextImage = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <OuterContainer>
      <HeroContainer sx={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            color: 'white',
            bgcolor: 'rgba(128, 128, 128, 0.5)',
            transform: 'translateY(-50%)',
          }}
          onClick={goToPreviousImage}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            color: 'white',
            bgcolor: 'rgba(128, 128, 128, 0.5)',
            transform: 'translateY(-50%)',
          }}
          onClick={goToNextImage}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </HeroContainer>
    </OuterContainer>
  );
}

export default Hero;

