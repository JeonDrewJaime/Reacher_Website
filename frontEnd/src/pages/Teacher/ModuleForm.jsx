import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database'; // Firebase Realtime Database functions
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import DatePicker from 'react-datepicker';
import { Box, Button, TextField, Divider } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';


const DatePickerWrapper = styled(Box)(({ theme }) => ({
  fontFamily: 'sans-serif', 
  '& .react-datepicker': {
    fontFamily: 'sans-serif !important', 
    width: '100%', 
    maxWidth: '100%', 
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  '& .react-datepicker__header': {
    backgroundColor: 'var(--wht)',  
    borderRadius: '8px 8px 0 0',
    color: '#fff',
    fontFamily: 'sans-serif !important', 
    fontSize: '16px',
    textAlign: 'center',
  },
  '& .react-datepicker__current-month': {
    fontFamily: 'sans-serif !important', 
    color: '#333 !important', 
    fontSize: '18px',  
  },
  '& .react-datepicker__day, .react-datepicker__day-name': {
    color: '#333',
    fontFamily: 'sans-serif !important', 
  },
  '& .react-datepicker__day--selected': {
    backgroundColor: 'var(--pri)',  
    color: '#fff',
  },
  '& .react-datepicker__day:hover': {
    backgroundColor: '#f1f1f1',
    cursor: 'pointer',
  },
  '& .react-datepicker__input-container input': {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '350px',
    fontSize: '14px',
    marginTop: '8px',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif !important', 
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--gray)',  
    },
  },
}));

export default function ModuleForm({ open, onClose }) {
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    durationStart: null,
    durationEnd: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setModuleData((prev) => ({
      ...prev,
      durationStart: start,
      durationEnd: end,
    }));
  };

  const getDuration = () => {
    if (moduleData.durationStart && moduleData.durationEnd) {
      const diffTime = moduleData.durationEnd - moduleData.durationStart;
      const diffDays = diffTime / (1000 * 3600 * 24); 
      const weeks = Math.ceil(diffDays / 7); 

      if (diffDays < 7) {
        return `${diffDays} days`; 
      } else {
        return `${weeks} weeks`; 
      }
    }
    return '';
  };

  const handleSubmit = async () => {
    const newModule = {
      ...moduleData,
      duration: getDuration(),
      durationStart: moduleData.durationStart?.toISOString() || null,
      durationEnd: moduleData.durationEnd?.toISOString() || null,
    };

    try {
      const db = getDatabase();
      const modulesRef = ref(db, 'modules'); // 'modules' collection in Realtime Database
      await push(modulesRef, newModule);
      alert('Module added successfully!');
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Failed to add module. Please try again.');
    }

    setModuleData({
      title: '',
      description: '',
      durationStart: null,
      durationEnd: null,
      color: 'var(--pri)',  
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg" // Makes the dialog larger
      fullWidth // Ensures it takes up more horizontal space
      sx={{ height: '100%', width: '100%' }} // Optionally adjust height and width to your needs
    >
      <DialogTitle>Add New Module</DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Lesson Title" name="title" value={moduleData.title} onChange={handleInputChange} />
        
        {/* Modified description field */}
        <TextField
          label="Description"
          name="description"
          value={moduleData.description}
          onChange={handleInputChange}
          multiline
          rows={4} // Adjust the number of rows (height) as needed
          rowsMax={6} // Optionally limit the maximum number of rows
        />

        {/* Duration (Date Range Picker with Time) */}
        <Box sx={{ marginTop: 2 }} fullWidth>
          <label>Duration</label>
          <DatePickerWrapper>
            <DatePicker
              fullWidth
              selected={moduleData.durationStart}
              startDate={moduleData.durationStart}
              endDate={moduleData.durationEnd}
              onChange={handleDateChange}
              selectsRange
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="Pp"
              isClearable
              placeholderText="Select date range and time"
              minDate={new Date()}
              timeIntervals={15} 
              showTimeSelectOnly={false}
              timeCaption="Time"
              wrapperClassName="custom-datepicker" 
            />
          </DatePickerWrapper>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose} 
        sx={{borderColor: 'var(--sec)',
            color: 'var(--sec)',
            '&:hover': {
              backgroundColor: 'rgba(0, 162, 255, 0.1)',
            },}}>Cancel</Button>

        <Button variant="outlined" onClick={handleSubmit} 
        sx={{borderColor: 'var(--pri)',
              color: 'var(--pri)',
              '&:hover': {
                backgroundColor: 'rgba(255, 105, 185, 0.1)',
              },}} >
          Add Module
        </Button>
      </DialogActions>
    </Dialog>
  );
}
