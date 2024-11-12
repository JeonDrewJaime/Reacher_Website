import React, { useState, useEffect } from 'react';
import { List, ListItemText, TextField, Typography, Box, InputAdornment, Select, MenuItem, IconButton, Fab, Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { db } from '../../../firebase'; // Import the firebase config
import { ref, get, remove } from "firebase/database"; // Import Firebase methods
import AccountForm from './AccountForm';
import AccountDetails from './AccountDetails';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [openForm, setOpenForm] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);

  const avatarColors = ['#8e56ff', '#f8941e', '#1ab69d'];

  const getAvatarColor = (index) => avatarColors[index % avatarColors.length];

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e) => setFilterStatus(e.target.value);

  // Fetch accounts from Firebase
  useEffect(() => {
    const fetchAccounts = async () => {
      const accountsRef = ref(db, 'users'); // Assuming "users" is the node where accounts are stored
      try {
        const snapshot = await get(accountsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const accountsArray = Object.keys(data).map(key => ({
            id: key,
            name: data[key].name || "Unknown", // Ensure a default name if not present
            ...data[key],
          }));
          setAccounts(accountsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || account.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (newAccount) => {
    const isDuplicate = accounts.some(account => account.name.toLowerCase() === newAccount.name.toLowerCase());
    if (isDuplicate) {
      alert('An account with this name already exists.');
      return;
    }

    setAccounts((prev) => [...prev, { ...newAccount, id: prev.length + 1 }]);
    setOpenForm(false); // Close form on successful submission
  };

  const handleDeleteAccount = async () => {
    try {
      // Reference to the account in Firebase based on its id
      const accountRef = ref(db, `users/${accountToDelete.id}`);
      
      // Remove the account from Firebase
      await remove(accountRef);

      // Update the local state to remove the account
      setAccounts((prev) => prev.filter(account => account.id !== accountToDelete.id));
      setOpenDeletePrompt(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      // Optionally, show an error message to the user
    }
  };

  if (selectedAccount) {
    return <AccountDetails account={selectedAccount} onBack={() => setSelectedAccount(null)} />;
  }

  return (
    <Box sx={{ padding: 4, mx: 3, mt: -3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>Accounts</Typography>
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
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          margin="normal"
          sx={{ mr: 2, borderRadius: 1 }}
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
          sx={{ minWidth: 180, borderRadius: 1, mt: 1 }}
        >
          <MenuItem value="all">Show All</MenuItem>
          <MenuItem value="Enabled">Show Enabled</MenuItem>
          <MenuItem value="Disabled">Show Disabled</MenuItem>
        </Select>
      </Box>

      <List>
        {filteredAccounts.map((account, index) => (
          <Box
            key={account.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Avatar sx={{ mr: 2, bgcolor: getAvatarColor(index) }}>
              {account.name.charAt(0)}
            </Avatar>
            <ListItemText
              primary={`${account.name.split(',')[0]}, ${account.name.split(',')[1]}`} // Last Name, First MI
              secondary={`Role: ${account.role} | Status: ${account.status}`}
            />
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => setSelectedAccount(account)}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                setAccountToDelete(account);
                setOpenDeletePrompt(true);
              }}
              sx={{ mr: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </List>

      <AccountForm open={openForm} onClose={() => setOpenForm(false)} onSubmit={handleFormSubmit} />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeletePrompt}
        onClose={() => setOpenDeletePrompt(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeletePrompt(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default Accounts;
