import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../assets/mcalogo.png';
import {loginSchema} from '../validationSchema'; // Import validation schema

function Login() {
  const navigate = useNavigate();

  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema, // Yup schema for validation
    onSubmit: (values) => {
      console.log(values);
      // You can handle login logic here or navigate to dashboard
      navigate('/dashboard');
    },
  });

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
          onSubmit={formik.handleSubmit}
        >
          {/* Username Field */}
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '25px' }}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          {/* Password Field */}
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '40px' }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
            type="submit"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
