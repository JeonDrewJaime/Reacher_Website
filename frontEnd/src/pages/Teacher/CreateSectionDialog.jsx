import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Button, TextField, Select, MenuItem, InputLabel, FormControl, Chip, Box } from '@mui/material';
import { ref, set, push, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../../../firebase';  // Import db from your Firebase config

function CreateNewSectionDialog({
  open,
  onClose,
  newSection,
  setNewSection,
  teacherNames = [],
}) {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);  // State to hold students filtered by role
  const [teachers, setTeachers] = useState([]);  // State to hold teachers filtered by role

  // Fetch users with the role of "Student"
  useEffect(() => {
    if (open) {
      // Query the Firebase database for users where role is "Student"
      const usersRef = query(ref(db, 'users'), orderByChild('role'), equalTo('Student'));

      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const studentList = [];

        // If the data exists, process it into a list of students with uid and name
        if (data) {
          Object.keys(data).forEach((key) => {
            const student = data[key];
            studentList.push({ uid: key, name: student.name });  // Store both uid and name
          });
        }

        setStudents(studentList);  // Update the students state
      });

      // Query the Firebase database for users where role is "Teacher"
      const teachersRef = query(ref(db, 'users'), orderByChild('role'), equalTo('Teacher'));

      onValue(teachersRef, (snapshot) => {
        const data = snapshot.val();
        const teacherList = [];

        // If the data exists, process it into a list of teachers with uid and name
        if (data) {
          Object.keys(data).forEach((key) => {
            const teacher = data[key];
            teacherList.push({ uid: key, name: teacher.name });  // Store both uid and name
          });
        }

        setTeachers(teacherList);  // Update the teachers state
      });
    }
  }, [open]);

  const handleCreateSectionWithFirebase = async () => {
    setLoading(true);
  
    try {
      // Generate a unique ID for the section using Firebase push()
      const newSectionRef = push(ref(db, 'sections'));
  
      // Set the section data, but without students directly in the section
      await set(newSectionRef, {
        sectionName: newSection.sectionName,
        teacher: newSection.teacher,  // Store the teacher's UID
      });
  
      // Now, create a subcollection under the section document for students
      newSection.students.forEach(async (studentUid) => {
        const studentRef = ref(db, `sections/${newSectionRef.key}/students/${studentUid}`);  // Reference to the student's document within the section's subcollection
        const studentData = students.find(student => student.uid === studentUid);
  
        if (studentData) {
          await set(studentRef, {
            name: studentData.name,  // Store the student's name
          });
        }
      });
  
      setLoading(false);
      onClose();  // Close the dialog on successful section creation
      alert('Section created successfully!');
    } catch (error) {
      setLoading(false);
      alert('Error creating section: ' + error.message);
    }
  };

  const handleStudentChange = (event) => {
    const value = event.target.value;
    setNewSection({ ...newSection, students: value });
  };

  const handleTeacherChange = (event) => {
    const value = event.target.value;
    setNewSection({ ...newSection, teacher: value });  // Store the teacher's UID
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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign Teacher</InputLabel>
          <Select
            value={newSection.teacher}
            onChange={handleTeacherChange}  // Update the selected teacher's UID
            variant="outlined"
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.uid} value={teacher.name}>  {/* Store UID in value */}
                {teacher.name}  {/* Display teacher's name */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Assign Students */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Assign Students</InputLabel>
          <Select
            multiple
            value={newSection.students}
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
          onClick={handleCreateSectionWithFirebase}
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
          {loading ? 'Creating...' : 'Create Section'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNewSectionDialog;
