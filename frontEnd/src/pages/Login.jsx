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
import { signinSchema } from '../validationSchema';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Message to display in Snackbar
  const [loading, setLoading] = useState(false); // Loading state for CircularProgress

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signinSchema,  // Apply signinSchema here
    onSubmit: async (values) => {
      setLoading(true); // Start loading indicator
      try {
        console.log('Form submitted', values); // Check if form submission is triggered
        await signInWithEmailAndPassword(auth, values.username, values.password);
        console.log('Login successful');
        navigate('/dashboard');
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          setAuthError('User not found. Please check your email and try again.');
          setSnackbarMessage('User not found. Please check your email and try again.');
        } else if (error.code === 'auth/wrong-password') {
          setAuthError('Incorrect password. Please try again.');
          setSnackbarMessage('Incorrect password. Please try again.');
        } else {
          setAuthError('Failed to login. Please try again.');
          setSnackbarMessage('Failed to login. Please try again.');
        }
        setSnackbarOpen(true); // Open the Snackbar when there's an error
        console.error('Authentication error:', error);
      }
      setLoading(false); // Stop loading indicator
    },
  });

  const handleForgotPassword = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
      handleClose();
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setAuthError('Failed to send password reset email. Please try again.');
      setSnackbarMessage('Failed to send password reset email. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

        {/* Login form */}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="text"
            variant="outlined"
            margin="normal"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 4 }}
          />
         
          <Button
            variant="contained"
            color="primary"
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
            onClick={formik.handleSubmit}
            disabled={loading} // Disable button when loading
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
          </Button>
        </form>

        <Button
          variant="text"
          color="secondary"
          fullWidth
          sx={{ marginTop: '20px' }}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Button>
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

      {/* Snackbar for displaying errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: authError ? '#d32f2f' : '#4caf50', // Red for errors, Green for success
        }}
      />
    </Box>
  );
}

export default Login;