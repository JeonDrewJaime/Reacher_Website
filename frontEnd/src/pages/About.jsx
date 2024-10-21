import React, { useEffect } from 'react'; 
import { Box, Typography, Divider } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import GlobalStyles from '../GlobalStyles';
import OneTrickPonyFont from '../assets/fonts/OneTrickPony.ttf'; // Ensure this path is correct
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
    });
    AOS.refresh(); 
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fdd011' }}>
      <GlobalStyles />

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
        variant="h2"
        align="center"
        sx={{
          marginBottom: '20px',
          fontFamily: 'OneTrickPony',
          fontWeight: 'normal',
          color: 'var(--wht)',
          fontSize: {
            xs: '60px',
            sm: '60px',
            md: '60px'
          }
        }}
        data-aos="fade-up"
      >
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
            sx={{
              marginBottom: '10px',
              fontFamily: 'OneTrickPony',
              fontWeight: 'normal',
              color: 'var(--wht)',
              fontSize: {
                xs: '40px',
                sm: '40px',
                md: '45px',
                lg: '50px'
              }
            }}
          >
            MISSION
          </Typography>
          <Typography sx={{ color: 'var(--wht)', fontFamily: 'sans-serif', 
            fontSize: {
              xs: '18px',
              sm: '18px',
              md: '22px',
              lg: '22px'
            }}}>
            We will carry out our mission with a commitment to create a community of lifelong, successful learners.
            Successful learners will be able to access information through appropriate use of written, oral, and technological resources.
            All pupils will demonstrate proficiency according to national standards.
            They will be prepared to apply their knowledge in order to function independently and contribute to our global society.
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--wht)', margin: '0 20px' }} />

        <Box sx={{ flex: 1, paddingLeft: '20px', textAlign: 'center' }} data-aos="fade-up">
          <Typography
            variant="h2"
            sx={{
              marginBottom: '10px',
              fontFamily: 'OneTrickPony',
              fontWeight: 'normal',
              color: 'var(--wht)',
              fontSize: {
                xs: '40px',
                sm: '40px',
                md: '45px',
                lg: '50px'
              }
            }}
          >
            VISION
          </Typography>
          <Typography sx={{ color: 'var(--wht)', fontFamily: 'sans-serif',
            fontSize: {
              xs: '18px',
              sm: '18px',
              md: '22px',
              lg: '22px'
            }
          }}>
            Marychild Academy strives to meet the academic, social, and 
            emotional needs of every pupil to prepare him or her for success 
            in a rapidly changing world. The school, parents, and community work 
            in partnership to develop in each pupil academic excellence, social responsibility, 
            and personal integrity. All stakeholders are committed to the implementation of National Grade Level Standards. 
          </Typography>
        </Box>
      </Box>

      <Box 
  sx={{ 
    display: 'flex',                     
    justifyContent: 'center',           // Center the boxes horizontally
    alignItems: 'stretch',              // Make boxes equal in height
    padding: '20px',                    
    gap: '5px',                         // Reduced gap for closer spacing
    flexDirection: { xs: 'column', md: 'row' }, // Stacks vertically on small screens
  }}
>
  {/* Box 1 */}
  <Box 
    sx={{ 
      display: 'flex',                 // Enable flexbox
      flexDirection: 'column',         // Align items vertically
      alignItems: 'center',            // Center items horizontally
      justifyContent: 'center',        // Center items vertically
      borderRadius: '10px',            // Removed border
      padding: '20px',                
      backgroundColor: '#fce583',      // Changed background color to #fce583
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // Add shadow
      flex: '1 1 300px',               // Ensure equal width for each box
      minWidth: '300px',               
      minHeight: '350px',              
    }}
  >
    <ScheduleIcon sx={{ fontSize: '80px', color: 'var(--wht)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--blk)' }}>
      8AM TO 5PM
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--blk)' }}>
      Working Hours
    </Typography>
  </Box>

  {/* Box 2 */}
  <Box 
    sx={{ 
      display: 'flex',                
      flexDirection: 'column',        
      alignItems: 'center',           
      justifyContent: 'center',       
      borderRadius: '10px',           
      padding: '20px', 
      backgroundColor: '#fce583',     
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  
      flex: '1 1 300px',              
      minWidth: '300px',               
      minHeight: '350px',              
    }}
  >
    <DirectionsIcon sx={{ fontSize: '90px', color: 'var(--wht)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--blk)' }}>
      Patag St. Lawa, Meycauayan, Bulacan
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--blk)' }}>
      Get Directions
    </Typography>
  </Box>

  {/* Box 3 */}
  <Box 
    sx={{ 
      display: 'flex',                
      flexDirection: 'column',        
      alignItems: 'center',           
      justifyContent: 'center',       
      borderRadius: '10px',           
      padding: '20px', 
      backgroundColor: '#fce583',     
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  
      flex: '1 1 300px',              
      minWidth: '300px',               
      minHeight: '350px',              
    }}
  >
    <PhoneInTalkIcon sx={{ fontSize: '80px', color: 'var(--wht)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--blk)' }}>
      (044) 935 4392
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--blk)' }}>
      Contact Us
    </Typography>
  </Box>
</Box>


   
    </div>
  );
};

export default About;

