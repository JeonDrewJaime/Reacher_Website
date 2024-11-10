// Accounts.js
import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Typography, Box, InputAdornment, Select, MenuItem, IconButton, Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AccountForm from './AccountForm';
import AccountDetails from './AccountDetails';

function Accounts() {
  const initialAccounts = [
    { id: 1, name: 'Mia', email: 'miasco@gmail.com', role: 'Admin', status: 'Enabled' },
    { id: 2, name: 'Musa', email: 'musa@gmail.com', role: 'User', status: 'Disabled' },
    { id: 3, name: 'Posca', email: 'posca@gmail.com', role: 'User', status: 'Enabled' },
    { id: 4, name: 'Teves', email: 'teves@gmail.com', role: 'Admin', status: 'Disabled' },
  ];

  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openForm, setOpenForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e) => setFilterStatus(e.target.value);

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (newAccount) => {
    setAccounts((prev) => [...prev, { ...newAccount, id: prev.length + 1 }]);
  };

  // If an account is selected, render the AccountDetails component
  if (selectedAccount) {
    return <AccountDetails account={selectedAccount} onBack={() => setSelectedAccount(null)} />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>Accounts</Typography>
        <Fab
          size="small"
          sx={{
            color: 'var(--wht)',
            bgcolor: 'var(--pri)',
            '&:hover': { backgroundColor: 'var(--sec)', color: '#FFFFFF' },
          }}
          aria-label="add"
          onClick={() => setOpenForm(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          label="Search by email"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          sx={{ mr: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Select
          value={filterStatus}
          onChange={handleStatusFilterChange}
          variant="outlined"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">Show All</MenuItem>
          <MenuItem value="Enabled">Show Enabled</MenuItem>
          <MenuItem value="Disabled">Show Disabled</MenuItem>
        </Select>
      </Box>

      <List>
        {filteredAccounts.map((account) => (
          <ListItem
            key={account.id}
            onClick={() => setSelectedAccount(account)}  // Select account on click
            button
          >
            <ListItemText primary={account.email} secondary={`Status: ${account.status}`} />
            <IconButton edge="end" aria-label="edit" onClick={() => console.log(`Edit ${account.email}`)}>
              <EditIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <AccountForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleFormSubmit} />
    </Box>
  );
}

export default Accounts;

