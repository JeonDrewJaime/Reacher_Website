import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Typography, Box, InputAdornment, Select, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

function Accounts() {

  const initialAccounts = [
    { id: 1, email: 'alice@example.com', status: 'Active' },
    { id: 2, email: 'bob@example.com', status: 'Inactive' },
    { id: 3, email: 'charlie@example.com', status: 'Active' },
    { id: 4, email: 'david@example.com', status: 'Inactive' },
  ];

  const [accounts, setAccounts] = useState(initialAccounts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesStatus;
  });


  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Accounts
      </Typography>
      

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
          <MenuItem value="Active">Show Active</MenuItem>
          <MenuItem value="Inactive">Show Inactive</MenuItem>
        </Select>
      </Box>

      {/* Account List */}
      <List>
        {filteredAccounts.map((account) => (
          <ListItem 
            key={account.id} 
            secondaryAction={
              <IconButton edge="end" aria-label="edit" onClick={() => console.log(`Edit ${account.email}`)}>
                <EditIcon />
              </IconButton>
            }
          >
            <ListItemText primary={account.email} secondary={`Status: ${account.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Accounts;
