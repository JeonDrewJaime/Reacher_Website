//ganto nlng kesa to do list paki connect nlng hehe

import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Edit, Visibility, Class, ArrowForward } from '@mui/icons-material';

const TodoContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--light-gray)`, 
  borderRadius: '6px', 
  padding: theme.spacing(2),
  margin: '5px 10px 30px 0',
  width: '100%',
  textAlign: 'center',
  backgroundColor: 'var(--wht)', 
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
          color: 'var(--blk)', 
          textAlign: 'center',
        }}
      >
        Shortcuts
      </Typography>

      <List sx={{ width: '100%', padding: 0 }}>
        {/* Edit Profile */}
        <ListItem
          sx={{
            padding: '10px 0',
            borderBottom: `1px solid var(--light-gray)`,
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between', 
            '&:hover': {
              backgroundColor: 'rgba(211, 211, 211, 0.3)', 
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Edit sx={{ color: 'var(--sec)', mr: 1 }} />
            <ListItemText
              primary="Edit Profile"
              sx={{
                color: 'var(--blk)', 
              }}
            />
          </Box>
          <ArrowForward sx={{ color: 'var(--sec)' }} /> {/* Add the ">" icon */}
        </ListItem>

        {/* View Modules */}
        <ListItem
          sx={{
            padding: '10px 0',
            borderBottom: `1px solid var(--light-gray)`,
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between', 
            '&:hover': {
              backgroundColor: 'rgba(211, 211, 211, 0.3)', 
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Visibility sx={{ color: 'var(--sec)', mr: 1 }} />
            <ListItemText
              primary="View Modules"
              sx={{
                color: 'var(--blk)',
              }}
            />
          </Box>
          <ArrowForward sx={{ color: 'var(--sec)' }} /> 
        </ListItem>

        {/* Classes */}
        <ListItem
          sx={{
            padding: '10px 0',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'space-between', 
            '&:hover': {
              backgroundColor: 'rgba(211, 211, 211, 0.3)', 
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Class sx={{ color: 'var(--sec)', mr: 1 }} />
            <ListItemText
              primary="Classes"
              sx={{
                color: 'var(--blk)', 
              }}
            />
          </Box>
          <ArrowForward sx={{ color: 'var(--sec)' }} /> 
        </ListItem>
      </List>
    </TodoContainer>
  );
};

export default TodoList;