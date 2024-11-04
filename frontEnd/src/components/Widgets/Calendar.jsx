import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CalendarContainer = styled(Box)(({ theme }) => ({
  border: `1px solid var(--light-gray)`,
  borderRadius: '6px',
  padding: theme.spacing(2),
  margin: '20px 10px 30px 0',
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

const Calendar = () => {
  return (
    <CalendarContainer
      sx={{
        padding: {
          xs: '30px 1px 1px',
          sm: '30px 1px 1px ',
          md: '30px 1px 1px 1px',
          lg: '40px 3px 1px 3px',
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
          fontSize: { fontWeight: '500',
            xs: '24px',
            sm: '24px',
            md: '24px',
            lg: '24px',
          },
          color: 'var(--blk)',
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
              '&:hover': {
                backgroundColor: 'var(--light-pnk)',
                
              },
              '&.MuiPickersDay-today': {
                borderColor: 'var(--pri)',
              },
              '&.MuiPickersDay-today.Mui-selected': {
                backgroundColor: 'var(--pri)',
              },
            },
            '.MuiPickersCalendarHeader-label': { // Target weekday labels
              color: 'var(--sec)', // Set color to `var(--sec)`
              fontWeight: '500', // Optional: Make the labels slightly bolder
            },
          '.MuiPickersCalendarHeader-weekDayLabel': { // Target weekday labels
            color: 'var(--sec)', 
            fontWeight: '500', 
          },
          }}
        />
      </LocalizationProvider>
    </CalendarContainer>
  );
};

export default Calendar;

