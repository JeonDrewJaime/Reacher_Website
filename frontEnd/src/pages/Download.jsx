import React, { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import appImage from '../assets/reachermobapp.png'; 
import background from '../assets/sky.png'; 

function Download() {
  const navigate = useNavigate();
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setContentVisible(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        padding: '20px',
        gap: 4,
      }}
    >
      {/* Left Container */}
      <Box
  sx={{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  
    padding: 1,
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? 'scale(1)' : 'scale(0.8)',
    transition: 'opacity 1s ease, transform 1s ease',
    maxWidth:{  xs: '200px',
      sm: '200px',
      md: '200px',
      lg: '170px',},
    height: { xs: 'auto', sm: 'auto' },
    overflow: 'visible', 
    mr:{ 
      sm: '-20px',
      md: '-10px',
      lg: '50px',},
      mb:{  xs: '-30px',
        },
  }}
>
  <Box
    component="img"
    src={appImage}
    alt="Reacher App"
    sx={{
      width: { xs: '120%', sm: '150%', md: '160%', lg: '200%' }, 
      height: 'auto', 
      position: 'relative',
      margin: '-10% auto 0', 
    }}
  />
</Box>

      {/* Right Container */}
      <Box
        sx={{
          flex: 1,
          padding: 3,
          textAlign: { xs: 'center', sm: 'left' },
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1s ease, transform 1s ease',
          maxWidth:{  xs: '600px',
            sm: '430px',
            md: '450px',
            lg: '500px',}
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '70px', sm: '70px', md: '100px',
              lg: '100px'  },
            marginBottom: '2px',
            color: 'var(--wht)',
           
          }}
        >
          REACHER
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: '500',
            fontSize: { xs: '20px', sm: '16px', md: '20px',
              lg: '20px'  },
            marginBottom: '20px',
            lineHeight: 1.6,
            color: 'white',mb:{ 
              sm: '30px',
              md: '30px',
              lg: '40px',},
          }}
        >
          Discover a seamless way to enhance your teaching and improve your
          students' learning experience. Our app offers user-friendly features
          tailored for educators and students alike.
          Take your educational journey to the next level with Reacher.
          Download now and see the difference!
        </Typography>
        <Button
  component="a"
  href={appImage}  
  download="ReacherApp.png"  
  sx={{
    display: 'inline-block',
    padding: '15px 35px',
    backgroundColor: 'var(--sec)', 
    color: 'var(--wht)', 
    fontSize: 'var(--p-font)', 
    fontWeight: 500,
    letterSpacing: '1px',
    borderRadius: '3rem',
    transition: 'all 0.5s ease',

    '&:hover': {
      backgroundColor: 'var(--pri)', 
      color: 'var(--wht)', 
      boxShadow: 'rgba(255, 105, 180, 0.7) 0px 1px 25px', 
    },
    '& i': {
      verticalAlign: 'middle',
      marginLeft: '9px',
      fontSize: '22px',
    },
  }}
>
  DOWNLOAD REACHER
</Button>



      </Box>
    </Box>
  );
}


export default Download
