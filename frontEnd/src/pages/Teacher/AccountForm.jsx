import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Grid, Snackbar, Alert } from '@mui/material';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

function AccountForm({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleInitial: '',
    email: '',
    password: '',
    role: '',
    status: 'Enabled',
    lrn: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setSnackbarMessage('Email and password are required.');
      setSnackbarOpen(true);
      return;
    }
  
    setIsSubmitting(true);
    const fullName = `${formData.firstName} ${formData.middleInitial ? formData.middleInitial + ". " : ''}${formData.lastName}`;
  
    try {
      const email = formData.email
      const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
      const user = userCredential.user;
  
      await set(ref(db, 'users/' + user.uid), {
        name: fullName,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lrn: formData.role === 'Student' ? formData.lrn : null,
      });
  
      setSnackbarMessage('Account successfully added!');
      setSnackbarOpen(true);
      onSubmit(formData);
  
      setFormData({
        lastName: '',
        firstName: '',
        middleInitial: '',
        email: '',
        password: '',
        role: '',
        status: 'Enabled',
        lrn: '',
      });
    } catch (error) {
      console.error("Error creating user: ", error);
      setSnackbarMessage('Error creating account. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="MI"
                  name="middleInitial"
                  value={formData.middleInitial}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              {formData.role === 'Student' && (
                <Grid item xs={12}>
                  <TextField
                    label="LRN"
                    name="lrn"
                    value={formData.lrn}
                    onChange={handleChange}
                    fullWidth
                    inputProps={{ maxLength: 12 }}
                  />
                </Grid>
              )}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="Enabled">Enabled</MenuItem>
                    <MenuItem value="Disabled">Disabled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarMessage === 'Account successfully added!' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AccountForm;

