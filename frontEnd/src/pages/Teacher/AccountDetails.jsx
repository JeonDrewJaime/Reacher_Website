import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function AccountDetails({ account, onBack, onModify }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>
      <Typography>Name: {account.name}</Typography>
      <Typography>Email: {account.email}</Typography>
      <Typography>Role: {account.role}</Typography>
      <Typography>Status: {account.status}</Typography>

      <Button onClick={onBack} variant="contained" color="primary" sx={{ mt: 2, mr: 2 }}>
        Back to Accounts
      </Button>
      <Button onClick={() => onModify(account)} variant="outlined" color="secondary" sx={{ mt: 2 }}>
        Modify
      </Button>
    </Box>
  );
}

export default AccountDetails;

