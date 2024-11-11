import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Fab, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateNewSectionDialog from '../Teacher/CreateSectionDialog'; 
import ModifySectionDialog from '../Teacher/ModifySectionDialog'; 
import StudentList from '../Teacher/StudentList';  

const initialClasses = [
  { id: 1, sectionName: 'Section 1', teacher: 'Mia P. Miasco', students: ['John Doe', 'Jane Smith'] },
  { id: 2, sectionName: 'Section 2', teacher: 'Musa L. Musa', students: ['Tom Green'] },
];

function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [openForm, setOpenForm] = useState(false);
  const [openModifyForm, setOpenModifyForm] = useState(false);
  const [newSection, setNewSection] = useState({ sectionName: '', teacher: '', students: [] });
  const [selectedSection, setSelectedSection] = useState(null);
  const [teacherNames] = useState(['Mia P. Miasco', 'Musa L. Musa', 'Posca C. Posca']);
  const [allStudents] = useState(['John Doe', 'Jane Smith', 'Tom Green', 'Andrea Teves', 'Lucas Lee', 'Emma Brown']);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  // State to control visibility of the Student List
  const [openStudentList, setOpenStudentList] = useState(false);

  const handleCreateSection = () => {
    if (newSection.sectionName && newSection.teacher) {
      setClasses([...classes, { ...newSection, id: classes.length + 1 }]);
      setOpenForm(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleStudentSelection = (event) => {
    const selected = event.target.value;
    setSelectedStudents(selected);
    setNewSection({ ...newSection, students: selected });
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
    setSelectedStudents(cls.students);
    setOpenModifyForm(true);
    handleMenuClose();
  };

  const handleModifySection = () => {
    setClasses(classes.map((cls) => (cls.id === selectedSection.id ? { ...cls, ...newSection, students: selectedStudents } : cls)));
    setOpenModifyForm(false);
  };

  const handleDelete = (id) => {
    setClasses(classes.filter(cls => cls.id !== id));
    handleMenuClose();
  };

  const assignedStudents = classes.flatMap(cls => cls.students);
  const availableStudents = allStudents.filter(student => !assignedStudents.includes(student));

  const handleShowStudentList = () => {
    setOpenStudentList(true);  // Show the StudentList when button is clicked
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

      {/* Class List Display */}
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
              onClick={handleShowStudentList} // Show student list on click
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

      {/* Conditionally Render the Student List Component */}
      {openStudentList && <StudentList students={selectedSection ? selectedSection.students : []} />}

      {/* Dialog for creating a new section */}
      <CreateNewSectionDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        teacherNames={teacherNames}
        handleCreateSection={handleCreateSection}
      />

      {/* Dialog for modifying a section */}
      <ModifySectionDialog
        open={openModifyForm}
        onClose={() => setOpenModifyForm(false)}
        newSection={newSection}
        setNewSection={setNewSection}
        selectedStudents={selectedStudents}
        setSelectedStudents={setSelectedStudents}
        availableStudents={availableStudents}
        handleModifySection={handleModifySection}
      />
    </Box>
  );
}

export default Classes;




