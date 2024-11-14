import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination, Paper, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebase'; // Import your Firebase config

const StudentList = ({ selectedSection, onBack }) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [modulesPerPage, setModulesPerPage] = useState(7);
  const totalModules = 26;

  // Responsive checks for different screen sizes
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    // Set modulesPerPage based on screen size
    if (isXs) {
      setModulesPerPage(3);
    } else if (isSm) {
      setModulesPerPage(5);
    } else if (isMd) {
      setModulesPerPage(4);
    } else if (isLg) {
      setModulesPerPage(7);
    }

    if (selectedSection?.id) {
      const sectionRef = ref(db, `sections/${selectedSection.id}/students`);
      
      get(sectionRef).then((snapshot) => {
        if (snapshot.exists()) {
          const studentList = [];
          snapshot.forEach((studentSnapshot) => {
            const student = studentSnapshot.val();
            studentList.push({
              uid: studentSnapshot.key,
              name: student.name,  // Get the student's name
              grades: student.grades || Array.from({ length: totalModules }, () => 0), // Default to 0 if grades not found
            });
          });
          setStudents(studentList);
        }
      }).catch((error) => {
        console.error('Error fetching students: ', error);
      });
    }
  }, [selectedSection]);

  const startModuleIndex = page * modulesPerPage;
  const endModuleIndex = Math.min(startModuleIndex + modulesPerPage, totalModules);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box>
      <Typography 
        variant={isXs ? 'h6' : 'h5'} 
        sx={{ 
          mb: 3, 
          fontSize: isXs ? '1rem' : '1.5rem', // Smaller font size for xs
        }}
      >
        {selectedSection?.sectionName} - Student List
      </Typography>

      {/* Table container with horizontal scroll on mobile */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: isXs ? '0.6rem' : '1rem' }}>Student Name</TableCell>
              {Array.from({ length: modulesPerPage }, (_, idx) => {
                const moduleIndex = startModuleIndex + idx + 1;
                return (
                  <TableCell key={moduleIndex} sx={{ fontSize: isXs ? '0.6rem' : '1rem' }}>
                    {`Module ${moduleIndex}`}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell sx={{ fontSize: isXs ? '0.6rem' : '1rem' }}>{student.name}</TableCell>
                {student.grades.slice(startModuleIndex, endModuleIndex).map((grade, idx) => (
                  <TableCell key={idx} sx={{ fontSize: isXs ? '0.6rem' : '1rem' }}>
                    {grade}% {/* Display student grades */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>

          {/* Pagination for modules inside the table */}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                component="td"
                count={totalModules} // Total modules
                rowsPerPage={modulesPerPage}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage="Modules per page"
                sx={{
                  width: '100%',
                  display: isXs ? 'none' : 'table', // Hide pagination on mobile
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Back to Classes button below both paginations */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            color: 'var(--pri)',
            borderColor: 'var(--pri)',
            '&:hover': { backgroundColor: 'rgba(255, 105, 185, 0.1)' },
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.8rem', // Adjust button text size for mobile
              padding: '8px 16px',
            },
          }}
        >
          Back to Classes
        </Button>
      </Box>
    </Box>
  );
};

export default StudentList;
