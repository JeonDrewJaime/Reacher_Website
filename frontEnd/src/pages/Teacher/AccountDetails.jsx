import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Container, Divider } from '@mui/material';
import { ref, set } from "firebase/database";
import { db } from '../../../firebase'; // Assuming Firebase config is set

function AccountDetails({ account, onBack, onSave }) {
  const [formData, setFormData] = useState(account);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Assuming onSave is passed as a function to update data in Firebase
    try {
      // Save updated account details to Firebase (modify the path as per your DB structure)
      const accountRef = ref(db, 'users/' + account.id); // Account ID for updating the specific user
      await set(accountRef, formData); // Updates the account data in Firebase

      onSave(formData); // Inform the parent component that the save is successful
      setIsSaving(false); // Stop loading indicator
    } catch (error) {
      console.error("Error saving account:", error);
      setIsSaving(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
        <Typography variant="h6" gutterBottom>
          Modify Account Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />

          {formData.role === 'Student' && (
            <>
              <Divider sx={{ my: 1 }} />
              <TextField
                label="LRN"
                name="lrn"
                value={formData.lrn || ''}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={onBack}
            variant="outlined"
            color="error"
            sx={{
              mt: 2,
              borderColor: 'var(--sec)',
              color: 'var(--sec)',
              '&:hover': {
                backgroundColor: 'rgba(0, 162, 255, 0.1)',
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
              borderColor: 'var(--pri)',
              color: 'var(--pri)',
              '&:hover': {
                backgroundColor: 'rgba(255, 105, 185, 0.1)',
              },
            }}
          >
            {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AccountDetails;
