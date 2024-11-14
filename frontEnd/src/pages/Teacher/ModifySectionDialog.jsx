import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase'; // Adjust path to where your firebase config is stored

function ModifySectionDialog({
  open,
  onClose,
  newSection,
  setNewSection,
  handleModifySection,
}) {
  const [teacherNames, setTeacherNames] = useState([]);  // State to hold the list of teachers

  // Fetch teacher names from Firebase
  useEffect(() => {
    const teachersRef = ref(db, 'users');
    onValue(teachersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedTeachers = Object.keys(data)
          .filter((key) => data[key].role === 'Teacher') // Only fetch teachers
          .map((key) => data[key].name);
        setTeacherNames(fetchedTeachers);
      }
    });
  }, []); // Only run once when the component is mounted

  // Handle changes to the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSection((prevState) => ({
      ...prevState,
      [name]: value,  // Update the name or teacher field based on user input
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Modify Section</DialogTitle>
      <DialogContent>
        <TextField
          label="Section Name"
          name="sectionName"
          value={newSection.sectionName}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Teacher</InputLabel>
          <Select
            name="teacher"
            value={newSection.teacher || ''}
            onChange={handleInputChange}
            label="Teacher"
          >
            {teacherNames.map((teacher) => (
              <MenuItem key={teacher} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleModifySection();  // Handle the modify section action
            onClose();  // Close the dialog after saving
          }}
          color="primary"
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifySectionDialog;
