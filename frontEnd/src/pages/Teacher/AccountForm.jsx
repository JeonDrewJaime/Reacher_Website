import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { accountSchema } from '../../validationSchema';

function AccountForm({ open, onClose, onSubmit, existingEmails, existingLrns, userToEdit = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      lastName: userToEdit ? userToEdit.lastName : '',
      firstName: userToEdit ? userToEdit.firstName : '',
      middleInitial: userToEdit ? userToEdit.middleInitial : '',
      password: userToEdit ? userToEdit.password : '',
      role: userToEdit ? userToEdit.role : '',
      gender: userToEdit ? userToEdit.gender : '',
      status: userToEdit ? userToEdit.status : 'Enabled',
      email: userToEdit ? userToEdit.email : '',
      lrn: userToEdit ? userToEdit.lrn : '',
    },
    validationSchema: accountSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);

      // Check if the email already exists
      if (existingEmails.includes(values.email)) {
        formik.setFieldError('email', 'An account with this email already exists. Please modify the email.');
        setIsSubmitting(false);
      }
      // Check if the LRN exists for students
      else if (values.role === 'Student' && existingLrns.includes(values.lrn)) {
        formik.setFieldError('lrn', 'This LRN already exists.');
        setIsSubmitting(false);
      } else {
        // Submit the form if validation passes
        onSubmit(values);
        handleClose();
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    if (open) {
      formik.resetForm();
      formik.setFieldValue('password', '');
    }
  }, [open]);

  // Debugging log for formik validation states
  useEffect(() => {
    console.log('isValid:', formik.isValid); // Logs validity state of the form
    console.log('dirty:', formik.dirty);     // Logs if the form is dirty (modified)
  }, [formik.isValid, formik.dirty]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" color="var(--sec)">
          {userToEdit ? 'Edit Account' : 'Add New Account'}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete="off"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, '');
                  formik.setFieldValue('lastName', value.charAt(0).toUpperCase() + value.slice(1));
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-z]/g, '');
                  formik.setFieldValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                inputProps={{ maxLength: 20 }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                label="MI"
                name="middleInitial"
                value={formik.values.middleInitial}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-Za-z]/g, '');
                  formik.setFieldValue('middleInitial', value);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.middleInitial && Boolean(formik.errors.middleInitial)}
                helperText={formik.touched.middleInitial && formik.errors.middleInitial}
                fullWidth
                inputProps={{
                  maxLength: 1,
                  style: { textTransform: 'uppercase' },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
            </Grid>

            {/* Add LRN for students */}
            {formik.values.role === 'Student' && (
              <Grid item xs={12}>
                <TextField
                  label="LRN"
                  name="lrn"
                  value={formik.values.lrn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lrn && Boolean(formik.errors.lrn)}
                  helperText={formik.touched.lrn && formik.errors.lrn}
                  fullWidth
                  inputProps={{
                    maxLength: 12,
                  }}
                />
              </Grid>
            )}

            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <Typography variant="caption" color="error">
                    {formik.errors.gender}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                </Select>
                {formik.touched.role && formik.errors.role && (
                  <Typography variant="caption" color="error">
                    {formik.errors.role}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                >
                  <MenuItem value="Enabled">Enabled</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Typography variant="caption" color="error">
                    {formik.errors.status}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={formik.handleSubmit}
          color="primary"
          disabled={isSubmitting || !formik.isValid || !formik.dirty}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountForm;






