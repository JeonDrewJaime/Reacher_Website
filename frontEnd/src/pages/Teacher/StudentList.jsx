import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  TableHead,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebase'; // Import your Firebase config

const StudentList = ({ selectedSection, onBack }) => {
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  // Fetch students and modules
  useEffect(() => {
    if (selectedSection?.id) {
      const sectionRef = ref(db, `sections/${selectedSection.id}`);
      get(sectionRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const sectionData = snapshot.val();
            console.log("Fetched Section Data:", sectionData);

            const studentList = [];
            const modulesData = {};

            Object.entries(sectionData.students || {}).forEach(([uid, studentData]) => {
              const grades = Object.entries(studentData.module || {}).map(([moduleId, module]) => {
                const scores = module.scores || {};
                return {
                  id: moduleId,
                  title: module.title || "Unnamed Module",
                  scores, // Include the scores in the grade object
                };
              });

              studentList.push({
                uid,
                name: studentData.name,
                grades,
              });

              Object.entries(studentData.module || {}).forEach(([moduleId, module]) => {
                if (!modulesData[moduleId]) {
                  modulesData[moduleId] = module.title || `Module ${moduleId}`;
                }
              });
            });

            const sortedModules = Object.entries(modulesData)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([id, title]) => ({ id, title }));

            setStudents(studentList);
            setModules(sortedModules);
          }
        })
        .catch((error) => {
          console.error('Error fetching section data:', error);
        });
    }
  }, [selectedSection]);

  const ModuleSubTable = ({ module, student }) => {
    const [open, setOpen] = useState(false);

    // Ensure we're accessing the correct scores for the specific student
    const studentScores = student.grades.find((grade) => grade.id === module.id)?.scores || {};

    // Map submodule details dynamically
    const submoduleDetails = Object.entries(studentScores).map(([uid, scoreData]) => {
      const subcollectionName = Object.keys(scoreData || {})[0];
      const submoduleInfo = scoreData[subcollectionName] || {};

      return {
        uid,
        subcollectionName,
        title: submoduleInfo?.name || module.title || "Unnamed Module",
        score: submoduleInfo?.score || 0,
      };
    });

    // Calculate overall score for this module based on submodule details
    const overallScore = submoduleDetails.length
      ? Math.round(submoduleDetails.reduce((sum, sub) => sum + sub.score, 0) / submoduleDetails.length)
      : 0;

    return (
      <>
        <TableRow>
          <TableCell colSpan={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{module.title}</span>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', marginRight: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={overallScore}
                    size={30}
                    thickness={4}
                    sx={{
                      color: overallScore >= 75 ? 'green' : overallScore >= 50 ? 'orange' : 'red',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '0.6rem',
                    }}
                  >
                    {`${overallScore}%`}
                  </Box>
                </Box>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </Box>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="submodule details">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Submodule Details</strong></TableCell>
                      <TableCell align="right"><strong>Score</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submoduleDetails.map((detail) => (
                      <TableRow key={`${detail.uid}-${detail.subcollectionName}`}>
                        <TableCell>
                          <Box>
                            <div>{detail.subcollectionName}</div>
                            <div style={{ fontSize: '0.8rem', color: 'gray' }}></div>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{`${detail.score}/${detail.score}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const StudentRow = ({ student }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow>
          <TableCell
            colSpan={2}
            sx={{
              fontSize: isXs ? '0.8rem' : '1rem',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{student.name}</span>
            <IconButton
              aria-label="expand student row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="modules for student">
                  <TableBody>
                    {modules.map((module) => (
                      <ModuleSubTable key={module.id} module={module} student={student} />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Box>
      <Typography
        variant={isXs ? 'h6' : 'h5'}
        sx={{
          mb: 3,
          fontSize: isXs ? '1rem' : '1.5rem',
        }}
      >
        {selectedSection?.sectionName} - Student List
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableBody>
            {students.map((student) => (
              <StudentRow key={student.uid} student={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            color: 'var(--pri)',
            borderColor: 'var(--pri)',
            '&:hover': { backgroundColor: 'rgba(255, 105, 185, 0.1)' },
            [theme.breakpoints.down('sm')]: {
              fontSize: '0.8rem',
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
