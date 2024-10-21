import React, { useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import GlobalStyles from '../GlobalStyles';
import OneTrickPonyFont from '../assets/fonts/OneTrickPony.ttf'; // Import the font
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // You can customize the duration of animations
    });
    AOS.refresh(); // Refresh animations on component load
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <GlobalStyles /> {/* Apply global styles */}

      {/* Add font-face declaration for OneTrickPony */}
      <style>
        {`
          @font-face {
            font-family: 'OneTrickPony';
            src: url(${OneTrickPonyFont}) format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>

      <Typography
        variant="h1"
        align="center"
        sx={{ marginBottom: '20px', fontFamily: 'OneTrickPony', fontWeight: 'normal', color: 'var(--sec)' }}
        data-aos="fade-up" >
        About Us
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', md: 'row' },
          marginBottom: '40px',
          padding: '20px',
          
        }}
      >
        <Box sx={{ flex: 1, paddingRight: '20px', textAlign: 'center' }} data-aos="fade-up" data-aos-anchor-placement="top-center">
          <Typography
            variant="h2"
            sx={{ marginBottom: '10px', fontFamily: 'OneTrickPony', fontWeight: 'normal', color: 'var(--sec)' }}
          >
            MISSION
          </Typography>
          <Typography sx={{ color: 'var(--gray)', fontFamily: 'sans-serif' }}>
            We will carry out our mission with a commitment to create a community of lifelong,
            successful learners...
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--sec)', margin: '0 20px' }} />

        <Box sx={{ flex: 1, paddingLeft: '20px', textAlign: 'center' }} data-aos="fade-up">
          <Typography
            variant="h2"
            sx={{ marginBottom: '10px', fontFamily: 'OneTrickPony', fontWeight: 'normal', color: 'var(--sec)' }}
          >
            VISION
          </Typography>
          <Typography sx={{ color: 'var(--gray)', fontFamily: 'sans-serif' }}>
            Marychild Academy strives to meet the academic, social, and emotional needs of every
            pupil to prepare him or her for success in a rapidly changing world...
          </Typography>
        </Box>
      </Box>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: 'var(--yellow)', padding: '20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            margin: '0 auto',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <ScheduleIcon />
            <Typography variant="h4" sx={{ marginBottom: '5px', fontFamily: 'OneTrickPony' }}>
              8AM TO 5PM
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony' }}>
              Working Hours
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <DirectionsIcon />
            <Typography variant="h4" sx={{ marginBottom: '5px', fontFamily: 'OneTrickPony' }}>
              Lawa Road, Barangay Lawa, Meycauayan, 3020, Bulacan
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony' }}>
              Get Directions
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <PhoneInTalkIcon />
            <Typography variant="h4" sx={{ marginBottom: '5px', fontFamily: 'OneTrickPony' }}>
              (044) 935 4392
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony' }}>
              Contact Us
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default About;
