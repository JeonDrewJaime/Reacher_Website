import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OuterContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--gray)`,
  boxShadow: theme.shadows[4],
  backgroundColor: 'var(--wht)',
  padding: '30px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
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

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 100, 
      height: 100,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function Profile() {
  const userName = 'Andrea Teves';
  const userRole = 'Admin';

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ml: {xs:'30px', sm:'30px', md:'50px', lg:'75px'}}}>
        Profile
      </Typography>
      
      <OuterContainer>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: '300px',
            backgroundImage: 'url(../src/assets/schoolbg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            p: 5,
          }}
        >
          {/* Dark overlay for background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              zIndex: 1,
            }}
          />

          <Grid container rowSpacing={0} alignItems="center" sx={{ position: 'relative', zIndex: 2 }}>
            {/* Avatar */}
            <Grid item xs={3}>
              <Avatar {...stringAvatar(userName)} />
            </Grid>

            {/* Name and Role */}
            <Grid item xs={9} container direction="column">
              <Grid item>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', opacity: 0.9 }}>
                  {userName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.7 }}>
                  {userRole}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Accordion sections */}
        <Box mt={4} width="100%">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Privacy Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>eme</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Account Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>eme</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>eme</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </OuterContainer>
    </>
  );
}

export default Profile;

