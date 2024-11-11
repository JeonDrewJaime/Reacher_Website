import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button, TextField, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@mui/material';

function ModifySectionDialog({
  open,
  onClose,
  section = { sectionName: '', teacher: '', students: [] }, // Default to an empty object with expected properties
  setSection,
  teacherNames = [], // Default to empty array if not provided
  studentNames = [], // Default to empty array if not provided
  handleModifySection
}) {
  const handleStudentChange = (event) => {
    const selectedStudents = event.target.value;
    setSection({ ...section, students: selectedStudents });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Modify Section</DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ minWidth: 500 }}>
        <TextField
          label="Section Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={section.sectionName} // Pre-populated with the current section name
          onChange={(e) => setSection({ ...section, sectionName: e.target.value })}
        />

        {/* Assign Teacher */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign Teacher</InputLabel>
          <Select
            value={section.teacher} // Pre-populated with the current teacher
            onChange={(e) => setSection({ ...section, teacher: e.target.value })}
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
            value={section.students || []} // Pre-populated with the current selected students
            onChange={handleStudentChange}
            variant="outlined"
            renderValue={(selected) => selected.join(', ')} // Display selected students as a comma-separated list
          >
            {studentNames.map((student) => (
              <MenuItem key={student} value={student}>
                <Checkbox checked={section.students?.includes(student)} />
                <ListItemText primary={student} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Divider Above Buttons */}
        <Divider sx={{ mb: 2 }} />
      </DialogContent>
      <DialogActions sx={{ mb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            mr: 1,
            borderColor: 'var(--sec)',
            color: 'var(--sec)',
            '&:hover': {
              backgroundColor: 'rgba(0, 162, 255, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleModifySection}
          variant="outlined"
          sx={{
            borderColor: 'var(--pri)',
            color: 'var(--pri)',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 185, 0.1)',
            },
          }}
        >
          Modify Section
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifySectionDialog;
