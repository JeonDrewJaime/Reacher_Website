import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const TodoContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--light-gray)`, // Flat border without shadow
  borderRadius: '6px', // Slightly rounded for a clean look
  padding: theme.spacing(2),
  margin: '5px 10px 30px 0',
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'var(--wht)', // Background color
  [theme.breakpoints.up('xs')]: {
    maxWidth: '370px',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '550px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '350px',
  },
}));

const TodoList = () => {
  return (
    <TodoContainer
      sx={{
        padding: {
          xs: '20px 5px',
          sm: '20px 5px',
          md: '25px 10px',
          lg: '25px 10px',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 1,
          fontSize: {
            xs: '24px',
            sm: '24px',
            md: '24px',
            lg: '24px',
          },
          color: 'var(--blk)', // Consistent text color for flat style
          textAlign: 'center',
        }}
      >
        To Do List
      </Typography>

      <List sx={{ width: '100%', padding: 0 }}>
        <ListItem sx={{ padding: '10px 0', borderBottom: `1px solid var(--light-gray)` }}>
          <ListItemText primary="To Grade" sx={{ textAlign: 'center', color: 'var(--blk)' }} />
        </ListItem>
        <ListItem sx={{ padding: '10px 0', borderBottom: `1px solid var(--light-gray)` }}>
          <ListItemText primary="Due assignments for Section 1" sx={{ textAlign: 'center', color: 'var(--blk)' }} />
        </ListItem>
        <ListItem sx={{ padding: '10px 0' }}>
          <ListItemText primary="Due assignments for Section 2" sx={{ textAlign: 'center', color: 'var(--blk)' }} />
        </ListItem>
      </List>
    </TodoContainer>
  );
};

export default TodoList;
