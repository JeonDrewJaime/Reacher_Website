import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button, TextField, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';

function CreateNewSectionDialog({
  open,
  onClose,
  newSection,
  setNewSection,
  teacherNames = [],  // Default to empty array if not provided
  studentNames = [],  // Default to empty array if not provided
  handleCreateSection
}) {
  const handleStudentChange = (event) => {
    const selectedStudents = event.target.value;
    setNewSection({ ...newSection, students: selectedStudents });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Section</DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ minWidth: 500 }}>
        <TextField
          label="Section Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={newSection.sectionName}
          onChange={(e) => setNewSection({ ...newSection, sectionName: e.target.value })}
        />
        
        {/* Assign Teacher */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign Teacher</InputLabel>
          <Select
            value={newSection.teacher}
            onChange={(e) => setNewSection({ ...newSection, teacher: e.target.value })}
            variant="outlined"
          >
            {teacherNames.map((teacher) => (
              <MenuItem key={teacher} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select Students */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Students</InputLabel>
          <Select
            multiple
            value={newSection.students || []} // Default to empty array if no students are selected
            onChange={handleStudentChange}
            variant="outlined"
            renderValue={(selected) => selected.join(', ')} // Display selected students as a comma-separated list
          >
            {studentNames.map((student) => (
              <MenuItem key={student} value={student}>
                <Checkbox checked={newSection.students?.includes(student)} />
                <ListItemText primary={student} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {/* Divider Above Buttons */}
       
      </DialogContent>
      <DialogActions sx={{ mb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ mr: 1, borderColor: 'var(--sec)',
              color: 'var(--sec)',
              '&:hover': {
                backgroundColor: 'rgba(0, 162, 255, 0.1)',
              }, }}>
          Cancel
        </Button>
        <Button onClick={handleCreateSection} variant="outlined" sx={{borderColor: 'var(--pri)',
              color: 'var(--pri)',
              '&:hover': {
                backgroundColor: 'rgba(255, 105, 185, 0.1)',
              },}}>
          Create Section
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewSectionDialog;

