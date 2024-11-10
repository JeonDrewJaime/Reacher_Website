import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../assets/mcalogo.png';
import schoolBg from '../assets/schoolbg.jpg';
import { loginSchema } from '../validationSchema';

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate('/dashboard');
    },
  });

  const handleForgotPassword = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendPassword = () => {
    console.log('Sending password to:', email);
    setOpen(false);
  };

  return (
    <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(rgba(135, 206, 235, 0.5), rgba(135, 206, 220, 1)), url(${schoolBg})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
            color: 'var(--blk)',
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

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '25px' }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

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
              marginBottom: '10px',
            }}
            type="submit"
          >
            Login
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={handleForgotPassword}
            sx={{
              color: 'var(--blk)',
            }}
          >
            Forgot Password?
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address below, and we’ll send you instructions to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendPassword} color="primary">
            Send Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Login;


