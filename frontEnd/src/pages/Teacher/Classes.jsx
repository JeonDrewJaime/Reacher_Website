import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Fab,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateNewSectionDialog from '../Teacher/CreateSectionDialog';
import ModifySectionDialog from '../Teacher/ModifySectionDialog';
import StudentList from '../Teacher/StudentList';
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../../firebase'; // Adjust path to where your firebase config is stored

function Classes() {
  const [classes, setClasses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [newSection, setNewSection] = useState({ sectionName: '', teacher: '', students: [] });
  const [selectedSection, setSelectedSection] = useState(null);
  const [teacherNames] = useState(['Mia P. Miasco', 'Musa L. Musa', 'Posca C. Posca']);
  const [anchorEl, setAnchorEl] = useState(null);

  // State to control visibility of the Student List
  const [openStudentList, setOpenStudentList] = useState(false);

  // Fetch classes from Firebase when component mounts
  useEffect(() => {
    const classesRef = ref(db, 'sections');
    onValue(classesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedClasses = Object.keys(data).map((key) => ({
          id: key,  // Using Firebase generated key as the class ID
          ...data[key],
        }));
        setClasses(fetchedClasses);
      }
    });
  }, []);

  const handleCreateSection = () => {
    if (newSection.sectionName && newSection.teacher) {
      const newSectionId = newSection.sectionName.replace(/\s+/g, '-').toLowerCase();  // Generate a simple ID based on section name
      set(ref(db, 'sections/' + newSectionId), {
        sectionName: newSection.sectionName,
        teacher: newSection.teacher,
        students: newSection.students,
      }).then(() => {
        setOpenForm(false);
        alert('Section created successfully!');
      }).catch((error) => {
        alert('Error creating section: ' + error.message);
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleMenuOpen = (event, section) => {
    setSelectedSection(section);
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleOpenModifyForm = (cls) => {
    setSelectedSection(cls);
    setNewSection({ ...cls }); // No need to update students
    setOpenModifyForm(true);
    handleMenuClose();
  };

  const handleModifySection = () => {
    if (selectedSection) {
      // 1. Create a reference to the section
      const sectionRef = ref(db, 'sections/' + selectedSection.id);

      // 2. Prepare the updated section object without modifying students
      const updatedSection = {
        sectionName: newSection.sectionName,
        teacher: newSection.teacher,
        students: selectedSection.students,  // Keep students as is (don't modify them)
      };

      // 3. Update the section data (section name, teacher)
      set(sectionRef, updatedSection)
        .then(() => {
          // Successfully updated the section, including the students subcollection remains untouched
          setClasses(classes.map((cls) => (cls.id === selectedSection.id ? updatedSection : cls)));
          setOpenModifyForm(false);
          alert('Section modified successfully!');
        })
        .catch((error) => {
          alert('Error modifying section: ' + error.message);
        });
    }
  };

  const handleDelete = (id) => {
    const sectionRef = ref(db, 'sections/' + id);  // Reference to the section in Firebase
    
    // Remove the section from Firebase
    remove(sectionRef)
      .then(() => {
        // Remove the deleted section from local state by filtering out the section with the matching ID
        const updatedClasses = classes.filter(cls => cls.id !== id);
        setClasses(updatedClasses);  // Set the updated list of classes
        handleMenuClose();  // Close the menu after action
        alert('Section deleted successfully!');  // Success message
      })
      .catch((error) => {
        // Handle errors if any
        alert('Error deleting section: ' + error.message);
      });
  };

  const handleShowStudentList = (cls) => {
    setSelectedSection(cls);
    setOpenStudentList(true);  
  };

  const handleBackToClasses = () => {
    setOpenStudentList(false);  
  };

  return (
    <Box sx={{ padding: 4, mx: 3, mt: -3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Class List</Typography>
        <Fab
          size="small"
          sx={{
            color: 'var(--wht)',
            bgcolor: 'var(--pri)',
            '&:hover': { backgroundColor: 'var(--sec)', color: '#FFFFFF' },
          }}
          aria-label="add"
          onClick={() => setOpenForm(true)} 
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Conditionally Render the Student List */}
      {openStudentList ? (
        <StudentList
          selectedSection={selectedSection}
          onBack={handleBackToClasses}  
        />
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {classes.map((cls) => (
            <Box
              key={cls.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                mb: 2,
                p: 3,
                width: 350, 
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: 3, 
                position: 'relative', 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': {
                  transform: 'scale(1.02)', 
                  boxShadow: 2, 
                },
              }}
            >
              <IconButton
                onClick={(event) => handleMenuOpen(event, cls)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'var(--gray)',
                }}
              >
                <MoreVertIcon />
              </IconButton>

              <Avatar
                sx={{
                  bgcolor: 'var(--pri)', 
                  fontSize: 16,
                  mt: 3,
                  mb: 1,
                  width: 40,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {cls.sectionName.split(' ')[1]}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--blk)', mb: 1 }}>
                {cls.sectionName}
              </Typography>
              <Divider sx={{ width: '100%', mb: 1 }} />
              <Typography variant="body2" sx={{ color: 'var(--blk)', mt: 2 }}>
                {cls.teacher}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--blk)', mb: 3, fontSize: '12px' }}>
                Teacher
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 24,
                  color: 'var(--pri)',
                  mb: 2,
                  borderColor: 'var(--pri)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 105, 185, 0.1)',
                  },
                }}
                onClick={() => handleShowStudentList(cls)} 
              >
                Student List
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleOpenModifyForm(cls)}>Modify</MenuItem>
                <MenuItem onClick={() => handleDelete(cls.id)}>Delete</MenuItem>
              </Menu>
            </Box>
          ))}
        </Box>
      )}

      {/* Dialog for creating a new section */}
      <CreateNewSectionDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        teacherNames={teacherNames}
        handleCreateSection={handleCreateSection}
      />

      {/* Modify Section Dialog */}
      <ModifySectionDialog
        open={openModifyForm}
        onClose={() => setOpenModifyForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        teacherNames={teacherNames}
        handleModifySection={handleModifySection}
      />
    </Box>
  );
}

export default Classes;
