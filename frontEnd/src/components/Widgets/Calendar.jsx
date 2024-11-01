// Calendar.js
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
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
    <CalendarContainer
    sx={{
      bgcolor: 'var(--wht)',
      padding: {
        xs: '10px 1px',
        sm: '10px 1px',
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
      Calendar
    </Typography>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        sx={{
          '.MuiPickersDay-root': {
            '&.Mui-selected': {
              backgroundColor: 'var(--pri)',
              color: 'white',
            },
            '&.MuiPickersDay-today': {
              borderColor: 'var(--pri)',
            },
            '&.MuiPickersDay-today.Mui-selected': {
              backgroundColor: 'var(--pri)',
            },
          },
        }}
      />
    </LocalizationProvider>
  </CalendarContainer>
  );
};

export default Calendar;
