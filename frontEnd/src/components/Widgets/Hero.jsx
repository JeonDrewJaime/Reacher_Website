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
  border: `1px solid var(--gray)`,
  boxShadow: theme.shadows[4],
  backgroundColor: 'var(--wht)',
  padding: '30px', 
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '40px auto',
  maxWidth: '90%',
  width: '100%',
  
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%', 
    padding: '15px', 
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '850px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '900px',
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
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', // Prevents image repetition

  minHeight: '300px', // Reduced height for balanced aspect ratio
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '100%',
    minHeight: '300px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '800px',
    minHeight: '350px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '900px',
    minHeight: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1000px',
    minHeight: '450px',
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
        {/* Navigation Arrows */}
        <IconButton sx={{ position: 'absolute', top: '50%', left: '20px', color: 'white', bgcolor:'rgba(128, 128, 128, 0.5)', zIndex: 10 }} onClick={goToPreviousImage}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton sx={{ position: 'absolute', top: '50%', right: '20px', color: 'white', bgcolor:'rgba(128, 128, 128, 0.5)', zIndex: 10 }} onClick={goToNextImage}>
          <ArrowForwardIosIcon />
        </IconButton>
      </HeroContainer>
    </OuterContainer>
  );
}

export default Hero;



