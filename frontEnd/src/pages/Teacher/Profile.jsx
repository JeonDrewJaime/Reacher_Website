import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { ref, get, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../../firebase';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const OuterContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--light-gray)`,
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
  const nameParts = name.split(' ');
  const initials = nameParts.length > 1
    ? `${nameParts[0][0]}${nameParts[1][0]}`
    : `${name[0] || ''}${name[1] || ''}`;

  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 100,
      height: 100,
    },
    children: initials,
  };
}

function Profile() {
  const [name, setName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('female');
  const [socialMediaUrl, setSocialMediaUrl] = useState('');
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setName(userData.name);
            setUserRole(userData.role);
            setEmail(userData.email);
            setBirthday(userData.birthday || '');
            setGender(userData.gender || 'female');
            setSocialMediaUrl(userData.socialMediaUrl || '');
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    });
  }, []);

  const handleSaveProfile = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        update(userRef, {
          birthday: birthday,
          gender: gender,
          socialMediaUrl: socialMediaUrl
        }).then(() => {
          alert('Profile Updated!');
        }).catch((error) => {
          console.error(error);
          alert('Error updating profile');
        });
      }
    });
  };

  const handleSendVerification = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.sendEmailVerification()
          .then(() => {
            alert('Verification email sent!');
          })
          .catch((error) => {
            console.error('Error sending verification email:', error);
            alert('Error sending verification email');
          });
      }
    });
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{
        ml: { xs: '30px', sm: '30px', md: '50px', lg: '75px' },
        mb: { xs: '-30px', sm: '30px', md: '50px', lg: '-15px' }
      }}>
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
            <Grid item xs={3}>
              <Avatar {...stringAvatar(name || "User")} />
            </Grid>

            <Grid item xs={9} container direction="column">
              <Grid item>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', opacity: 0.9 }}>
                  {name || "Loading..."}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" sx={{ color: 'white', opacity: 0.7 }}>
                  {userRole || "Loading..."}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Accordion sections and additional fields */}
        <Box mt={4} width="100%">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>My Account</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Birthday"
                    variant="outlined"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label="Gender">
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="preferNotToSay">Prefer not to say</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Social Media URL"
                    variant="outlined"
                    value={socialMediaUrl}
                    onChange={(e) => setSocialMediaUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button variant="contained" sx={{ bgcolor: 'var(--sec)' }} onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Change Password</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button variant="contained" sx={{ bgcolor: 'var(--sec)' }} onClick={handleSendVerification}>
                    Send Verification
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>
      </OuterContainer>
    </>
  );
}

export default Profile;
