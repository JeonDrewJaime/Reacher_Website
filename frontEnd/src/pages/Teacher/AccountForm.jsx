import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Snackbar, Alert, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

import { accountSchema } from '../../validationSchema';

function AccountForm({ open, onClose, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const initialValues = {
    lastName: '',
    firstName: '',
    middleInitial: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    status: 'Enabled',
    lrn: '',
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const fullName = `${values.firstName} ${values.middleInitial ? values.middleInitial + ". " : ''}${values.lastName}`;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await set(ref(db, 'users/' + user.uid), {
        name: fullName,
        email: values.email,
        role: values.role,
        status: values.status,
        lrn: values.role === 'Student' ? values.lrn : null,
      });

      setSnackbarMessage('Account successfully added!');
      setSnackbarOpen(true);
      onSubmit(values);
      resetForm();
    } catch (error) {
      console.error("Error creating user: ", error);

      if (error.code === 'auth/email-already-in-use') {
        setSnackbarMessage('The email is already in use. Please use a different email address.');
      } else {
        setSnackbarMessage('Error creating account. Please try again.');
      }

      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add New Account</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={accountSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="lastName" />}
                      error={!!values.lastName}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      as={TextField}
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="firstName" />}
                      error={!!values.firstName}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Field
                      as={TextField}
                      label="Middle Initial"
                      name="middleInitial"
                      value={values.middleInitial}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="middleInitial" />}
                      error={!!values.middleInitial}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="email" />}
                      error={!!values.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="password" />}
                      error={!!values.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      fullWidth
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={!!values.confirmPassword}
                    />
                  </Grid>
                  {values.role === 'Student' && (
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        label="LRN"
                        name="lrn"
                        value={values.lrn}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{ maxLength: 12 }}
                        helperText={<ErrorMessage name="lrn" />}
                        error={!!values.lrn}
                      />
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={values.role}
                        onChange={handleChange}
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
                        value={values.status}
                        onChange={handleChange}
                      >
                        <MenuItem value="Enabled">Enabled</MenuItem>
                        <MenuItem value="Disabled">Disabled</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
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
