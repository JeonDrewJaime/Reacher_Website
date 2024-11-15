import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button, Select, MenuItem, InputLabel, FormControl, Chip, Box } from '@mui/material';
import { ref, set, push, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../../firebase';  // Import db from your Firebase config

function AddStudents({
  open,
  onClose,
  sectionId,       // The specific section ID to add students to
  setNewSection,    // Function to update section data if needed
}) {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);   // List of available students
  const [selectedStudents, setSelectedStudents] = useState([]);  // Selected students for assignment

  useEffect(() => {
    if (open) {
      const usersRef = query(ref(db, 'users'), orderByChild('role'), equalTo('Student'));

      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const studentList = [];

        if (data) {
          Object.keys(data).forEach((key) => {
            const student = data[key];
            studentList.push({ uid: key, name: student.name });
          });
        }

        setStudents(studentList);
      });
    }
  }, [open]);

  // Function to handle adding selected students to the section
  const handleAddStudentsWithFirebase = async () => {
    setLoading(true);

    try {
      // Assign each selected student to the section in the database
      selectedStudents.forEach(async (studentUid) => {
        const studentRef = ref(db, `sections/${sectionId}/students/${studentUid}`);
        const studentData = students.find(student => student.uid === studentUid);

        if (studentData) {
          await set(studentRef, {
            name: studentData.name,
          });
        }
      });

      setLoading(false);
      onClose();
      alert('Students assigned successfully!');
    } catch (error) {
      setLoading(false);
      alert('Error assigning students: ' + error.message);
    }
  };

  const handleStudentChange = (event) => {
    setSelectedStudents(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assign Students to Section</DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ minWidth: 500 }}>
        {/* Assign Students */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign Students</InputLabel>
          <Select
            multiple
            value={selectedStudents}
            onChange={handleStudentChange}
            variant="outlined"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const student = students.find(student => student.uid === value);
                  return student ? <Chip key={value} label={student.name} /> : null;
                })}
              </Box>
            )}
          >
            {students.map((student) => (
              <MenuItem key={student.uid} value={student.uid}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          onClick={handleAddStudentsWithFirebase}
          variant="outlined"
          disabled={loading}
          sx={{
            borderColor: 'var(--pri)',
            color: 'var(--pri)',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 185, 0.1)',
            },
          }}
        >
          {loading ? 'Assigning...' : 'Assign Students'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStudents;