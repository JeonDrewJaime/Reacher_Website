// SectionModify.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, Checkbox, ListItemText, Typography } from '@mui/material';

function SectionModify({ open, handleClose, sectionData, onSave, teacherNames, allStudents }) {
  const [modifiedSection, setModifiedSection] = useState(sectionData);
  const [selectedStudents, setSelectedStudents] = useState(sectionData.students);

  const handleStudentSelection = (event) => {
    const selected = event.target.value;
    setSelectedStudents(selected);
    setModifiedSection({ ...modifiedSection, students: selected });
  };

  const handleSaveChanges = () => {
    onSave(modifiedSection);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modify Section</DialogTitle>
      <DialogContent sx={{ minWidth: 500 }}>
        <TextField
          label="Section Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={modifiedSection.sectionName}
          onChange={(e) => setModifiedSection({ ...modifiedSection, sectionName: e.target.value })}
        />

        <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
          Teacher
        </Typography>
        <Select
          value={modifiedSection.teacher}
          onChange={(e) => setModifiedSection({ ...modifiedSection, teacher: e.target.value })}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          {teacherNames.map((teacher) => (
            <MenuItem key={teacher} value={teacher}>
              {teacher}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body1" sx={{ mb: 1 }}>
          Select Students
        </Typography>
        <Select
          multiple
          value={selectedStudents}
          onChange={handleStudentSelection}
          renderValue={(selected) => selected.join(', ')}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          {allStudents.map((student) => (
            <MenuItem key={student} value={student}>
              <Checkbox checked={selectedStudents.indexOf(student) > -1} />
              <ListItemText primary={student} />
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" sx={{ borderColor: 'var(--sec)', color: 'var(--sec)', '&:hover': { backgroundColor: 'rgba(0, 162, 255, 0.1)' } }}>
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} variant="outlined" sx={{ borderColor: 'var(--pri)', color: 'var(--pri)', '&:hover': { backgroundColor: 'rgba(255, 105, 185, 0.1)' } }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SectionModify;
