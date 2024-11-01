// Calendar.js
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const CalendarContainer = styled(Box)(({ theme }) => ({
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

const Calendar = () => {
  return (
    <CalendarContainer>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Calendar
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar />
      </LocalizationProvider>
    </CalendarContainer>
  );
};

export default Calendar;
