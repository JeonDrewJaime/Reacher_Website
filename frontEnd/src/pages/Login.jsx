import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../assets/mcalogo.png'; 

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle login
  const handleLogin = () => {
    // Add authentication logic here (optional, e.g., validate username/password)

    // After successful login, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--blu)', 
        padding: '20px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px', 
          padding: '40px 30px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px', 
          backgroundColor: 'var(--wht)', 
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: '60px', 
            height: 'auto',
            display: 'block',
            margin: '0 auto 20px', 
          }}
        />

        <Typography
          variant="h4"
          sx={{
            color: '#292929', 
            textAlign: 'center',
            fontWeight: '800',
            marginBottom: '40px',
          }}
        >
          WELCOME
        </Typography>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
          noValidate
          autoComplete="off"
        >
          {/* Username Field */}
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '25px' }}
          />

          {/* Password Field */}
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '40px' }}
          />

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#45b6d4', 
              color: '#FFFFFF', 
              padding: '10px 0',
              '&:hover': {
                backgroundColor: '#FE81B9', 
              },
            }}
            onClick={handleLogin} 
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;

