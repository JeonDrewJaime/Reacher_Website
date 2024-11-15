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
import AddStudents from '../Teacher/AddStudents';
import { ref, set, remove, onValue } from 'firebase/database';
import { db } from '../../../firebase';

function Classes() {
  const [classes, setClasses] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [openAddStudents, setOpenAddStudents] = useState(false);
  const [newSection, setNewSection] = useState({ sectionName: '', teacher: '', students: [] });
  const [selectedSection, setSelectedSection] = useState(null);
  const [teacherNames] = useState(['Mia P. Miasco', 'Musa L. Musa', 'Posca C. Posca']);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openStudentList, setOpenStudentList] = useState(false);

  useEffect(() => {
    const classesRef = ref(db, 'sections');
    onValue(classesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedClasses = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setClasses(fetchedClasses);
      }
    });
  }, []);

  const handleCreateSection = () => {
    if (newSection.sectionName && newSection.teacher) {
      const newSectionId = newSection.sectionName.replace(/\s+/g, '-').toLowerCase();
      set(ref(db, 'sections/' + newSectionId), {
        sectionName: newSection.sectionName,
        teacher: newSection.teacher,
        students: newSection.students,
      })
        .then(() => {
          setOpenForm(false);
          alert('Section created successfully!');
        })
        .catch((error) => {
          alert('Error creating section: ' + error.message);
        });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleMenuOpen = (event, section) => {
    setSelectedSection(section);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModifyForm = (cls) => {
    setSelectedSection(cls);
    setNewSection({ ...cls });
    setOpenModifyForm(true);
    handleMenuClose();
  };

  const handleModifySection = () => {
    if (selectedSection) {
      const sectionRef = ref(db, 'sections/' + selectedSection.id);
      const updatedSection = {
        sectionName: newSection.sectionName,
        teacher: newSection.teacher,
        students: selectedSection.students,
      };

      set(sectionRef, updatedSection)
        .then(() => {
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
    const sectionRef = ref(db, 'sections/' + id);

    remove(sectionRef)
      .then(() => {
        const updatedClasses = classes.filter((cls) => cls.id !== id);
        setClasses(updatedClasses);
        handleMenuClose();
        alert('Section deleted successfully!');
      })
      .catch((error) => {
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

  const handleFabClick = () => {
    if (openStudentList) {
      setOpenAddStudents(true); // Show AddStudents dialog if StudentList is open
    } else {
      setOpenForm(true); // Show CreateSection dialog if StudentList is not open
    }
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
          onClick={handleFabClick} // Set the Fab click handler
        >
          <AddIcon />
        </Fab>
      </Box>

      {openStudentList ? (
        <StudentList selectedSection={selectedSection} onBack={handleBackToClasses} />
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
  {/* Ensure cls.sectionName is defined and has a space before calling split */}
  {cls.sectionName && cls.sectionName.split(' ')[1] ? cls.sectionName.split(' ')[1] : 'N/A'}
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

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => handleOpenModifyForm(cls)}>Modify</MenuItem>
                <MenuItem onClick={() => handleDelete(cls.id)}>Delete</MenuItem>
              </Menu>
            </Box>
          ))}
        </Box>
      )}

      <CreateNewSectionDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        teacherNames={teacherNames}
        handleCreateSection={handleCreateSection}
      />

      <ModifySectionDialog
        open={openModifyForm}
        onClose={() => setOpenModifyForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        teacherNames={teacherNames}
        handleModifySection={handleModifySection}
      />

      <AddStudents open={openAddStudents} onClose={() => setOpenAddStudents(false)} />
    </Box>
  );
}

export default Classes;