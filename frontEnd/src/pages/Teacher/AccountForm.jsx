import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Grid, Typography } from '@mui/material';
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
    status: 'Enabled',  // Default to "Enabled"
    lrn: '',  // For student role, LRN will be included
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user details in Firebase Realtime Database
      await set(ref(db, 'users/' + user.uid), {
        lastName: formData.lastName,
        firstName: formData.firstName,
        middleInitial: formData.middleInitial,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        lrn: formData.role === 'Student' ? formData.lrn : null, // Store LRN only for students
      });

      onSubmit(formData);
      onClose();
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Account</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2} sx ={{mt: 1}}> 
            {/* Last Name */}
            <Grid item xs={5}>
              <TextField 
                label="Last Name" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                fullWidth
              />
            </Grid>

            {/* First Name */}
            <Grid item xs={5}>
              <TextField 
                label="First Name" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                fullWidth
              />
            </Grid>

            {/* Middle Initial */}
            <Grid item xs={2}>
              <TextField 
                label="MI" 
                name="middleInitial" 
                value={formData.middleInitial} 
                onChange={handleChange} 
                fullWidth 
              />
            </Grid>

            {/* Email */}
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

            {/* Password */}
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

            {/* LRN field for Student role */}
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

            {/* Role Selector */}
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

            {/* Status Selector */}
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
  );
}

export default AccountForm;
