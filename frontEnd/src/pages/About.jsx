import React, { useEffect } from 'react'; 
import { Box, Typography, Divider } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DirectionsIcon from '@mui/icons-material/Directions';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import GlobalStyles from '../GlobalStyles';
import OneTrickPonyFont from '../assets/fonts/OneTrickPony.ttf'; 
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
    <div style={{ padding: '20px', backgroundColor: '#d0e8a9' }}>
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
          color: 'var(--drk-gre)',
          marginTop: '2%',
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
        <Box sx={{ flex: 1, paddingRight: '20px', textAlign: 'center', marginTop:'3%', marginBottom:'3%', }} data-aos="fade-up" data-aos-anchor-placement="top-center">
          <Typography
            variant="h2"
            sx={{
              marginBottom: '10px',
              fontFamily: 'OneTrickPony',
              fontWeight: 'normal',
              color: 'var(--drk-gre)',
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
          <Typography sx={{ color: 'var(--drk-gre)', fontFamily: 'sans-serif', 
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
     <Divider 
  sx={{ 
    borderColor: 'var(--drk-gre)', 
    borderWidth: '1px', 
    marginTop: '3%', 
    height: '350px', 
    mx: 2, 
    display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'}  // Hide on extra small screens, show on small and up
  }} 
  data-aos="zoom-in" 
/>
        <Box sx={{ flex: 1, paddingLeft: '20px', textAlign: 'center', marginTop:'3%', marginBottom:'3%'}} data-aos="fade-up">
          <Typography
            variant="h2"
            sx={{
              marginBottom: '10px',
              fontFamily: 'OneTrickPony',
              fontWeight: 'normal',
              color: 'var(--drk-gre)',
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
          <Typography sx={{ color: 'var(--drk-gre)', fontFamily: 'sans-serif',
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
    justifyContent: 'center',           
    alignItems: 'stretch',              
    padding: '20px',                    
    gap: '25px',                         
    flexDirection: { xs: 'column', md: 'row' },
  }}
>
  {/* Box 1 */}
  <Box 
    sx={{ 
      display: 'flex',                 
      flexDirection: 'column',         
      alignItems: 'center',            
      justifyContent: 'center',        
      borderRadius: '10px',           
      padding: '20px',                
      backgroundColor: '#FFFFF0',     
      boxShadow: '0px 4px 8px rgba(0, 100, 0, 0.5)',  
      flex: '1 1 300px',            
      minWidth: '300px',               
      minHeight: '350px',              
    }} data-aos="zoom-out-right"
  >
    <ScheduleIcon sx={{ fontSize: '80px', color: 'var(--drk-gre)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--drk-gre)' }}>
      8AM TO 5PM
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--drk-gre)' }}>
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
      backgroundColor: '#FFFFF0',      
      boxShadow: '0px 4px 8px rgba(0, 100, 0, 0.5)',  
      flex: '1 1 300px',              
      minWidth: '300px',               
      minHeight: '350px',              
    }}data-aos="zoom-out"
  >
    <DirectionsIcon sx={{ fontSize: '90px', color: 'var(--drk-gre)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--drk-gre)',
      fontSize: {
        xs: '15px',
        sm: '18px',
        md: '15px',
        lg: '18px'
      }
     }}>
      Patag St. Lawa, Meycauayan, Bulacan
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--drk-gre)' }}>
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
      backgroundColor: '#FFFFF0',     
      boxShadow: '0px 4px 8px rgba(0, 100, 0, 0.5)',  // Dark green shadow
      flex: '1 1 300px',              
      minWidth: '300px',               
      minHeight: '350px',              
    }}data-aos="zoom-out-left"
  >
    <PhoneInTalkIcon sx={{ fontSize: '80px', color: 'var(--drk-gre)' }} />
    <Typography variant="h5" sx={{ marginBottom: '5px', fontFamily: 'sans-serif', color: 'var(--drk-gre)' }}>
      (044) 935 4392
    </Typography>
    <Typography variant="h6" sx={{ fontFamily: 'OneTrickPony', color: 'var(--drk-gre)' }}>
      Contact Us
    </Typography>
  </Box>
</Box>



   
    </div>
  );
};

export default About;

