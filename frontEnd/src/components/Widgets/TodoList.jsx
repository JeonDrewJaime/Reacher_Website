// TodoList.js
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, List,ListItem, ListItemText} from '@mui/material';

const TodoContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--gray)`,
  boxShadow: theme.shadows[4],
  borderRadius: '8px',
  padding: theme.spacing(2),
  margin: '20px 10px 30px 0',
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.up('xs')]: {
    maxWidth: '320px',
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
      bgcolor: 'var(--wht)',
      padding: {
        xs: '20px 5px',
        sm: '20px 5px',
        md: '30px 5px',
        lg: '30px 3px',
      },
      width: '100%',
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
          xs: '30px',
          sm: '30px',
          md: '30px',
          lg: '30px',
        },
        textAlign: 'center',
      }}
    >
      To Do List
    </Typography>

    <List>
      <ListItem>
        <ListItemText primary="To Grade" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Due assignments for Class A" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Due assignments for Class B" />
      </ListItem>
    </List>
  </TodoContainer>
  );
};

export default TodoList;
