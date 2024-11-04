import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, ButtonBase, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import Lesson from './Lesson';

function Schedule() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Sample data for weekly lessons with modules
  const lessons = [
    { 
      week: 'Week 1', 
      topic: 'Alphabet and Phonics', 
      modules: ['Learning the Alphabet', 'Letter Sounds', 'Matching Letters to Pictures'] 
    },
    { 
      week: 'Week 2', 
      topic: 'Basic Sight Words', 
      modules: ['Introduction to Sight Words', 'Flashcards', 'Games with Sight Words'] 
    },
    { 
      week: 'Week 3', 
      topic: 'Simple Word Formation', 
      modules: ['Building Words with Letters', 'Rhyming Words', 'Word Families'] 
    },
    { 
      week: 'Week 4', 
      topic: 'Reading Simple Sentences', 
      modules: ['Reading Two-Word Phrases', 'Picture and Word Matching', 'Creating Simple Sentences'] 
    },
  ];
  
  // Function to handle click on a lesson card
  const handleCardClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  // If a lesson is selected, render the Lesson component
  if (selectedLesson) {
    return <Lesson lesson={selectedLesson} onBack={() => setSelectedLesson(null)} />;
  }

  return (
    <Box p={2}>
   
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Fab size="small"
          sx={{
            color: 'var(--wht)',
            bgcolor: 'var(--pri)',
            '&:hover': {
              backgroundColor: 'var(--sec)',
              color: '#FFFFFF',
            },
          }} 
          aria-label="add" 
          onClick={() => handleCardClick({ week: 'New Lesson', topic: 'Add a new lesson', modules: [] })}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Container for Section A */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--light-gray)',
          borderRadius: '6px',
          maxWidth: '1000px',
          margin: 'auto',
          backgroundColor: 'var(--wht)',
          padding: {
            xs: '30px',
            sm: '30px',
            md: '30px',
            lg: '40px',
          },
          mb: 4, // Space between sections
        }}
      >
        {/* Section A Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2}>
          <Typography variant="h5">Lesson</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ color: 'var(--blk)', fontSize: '15px' }}>Section:</Typography>
            <Typography variant="h6" sx={{ color: 'var(--sec)', marginLeft: '4px', fontSize: '16px' }}>Section 1</Typography>
          </Box>
        </Box>

        {/* Lessons Grid for Section A */}
        <Grid container spacing={2} justifyContent="center">
          {lessons.map((lesson, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ButtonBase 
                onClick={() => handleCardClick(lesson)} 
                style={{ width: '100%' }}
              >
                <Card 
                  variant="outlined" 
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  // Hover effect
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'; 
                    e.currentTarget.style.boxShadow = '0 2px 10px lightgray'; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'; 
                    e.currentTarget.style.boxShadow = 'none'; 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{lesson.week}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      {lesson.topic}
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
          {/* Add Lesson Card for Section A */}
          <Grid item xs={12} sm={6} md={4}>
            <ButtonBase 
              onClick={() => handleCardClick({ week: 'New Lesson', topic: 'Add a new lesson', modules: [] })} 
              style={{ width: '100%' }}
            >
              <Card 
                variant="outlined" 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 2px 10px lightgray';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AddIcon style={{ fontSize: 40, color: 'var(--sec)' }} /> 
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>

      {/* Container for Section B */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--light-gray)',
          borderRadius: '6px',
          maxWidth: '1000px',
          margin: 'auto',
          backgroundColor: 'var(--wht)',
          padding: {
            xs: '30px',
            sm: '30px',
            md: '30px',
            lg: '40px',
          },
        }}
      >
        {/* Section B Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2}>
          <Typography variant="h5">Lesson</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ color: 'var(--blk)', fontSize: '15px' }}>Section:</Typography>
            <Typography variant="h6" sx={{ color: 'var(--sec)', marginLeft: '4px', fontSize: '16px' }}>Section 2</Typography>
          </Box>
        </Box>

        {/* Lessons Grid for Section B */}
        <Grid container spacing={2} justifyContent="center">
          {lessons.map((lesson, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ButtonBase 
                onClick={() => handleCardClick(lesson)} 
                style={{ width: '100%' }}
              >
                <Card 
                  variant="outlined" 
                  style={{ 
                    width: '100%', 
                    height: '150px', 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                  // Hover effect
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'; 
                    e.currentTarget.style.boxShadow = '0 2px 10px lightgray'; 
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'; 
                    e.currentTarget.style.boxShadow = 'none'; 
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{lesson.week}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      {lesson.topic}
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          ))}
          {/* Add Lesson Card for Section B */}
          <Grid item xs={12} sm={6} md={4}>
            <ButtonBase 
              onClick={() => handleCardClick({ week: 'New Lesson', topic: 'Add a new lesson', modules: [] })} 
              style={{ width: '100%' }}
            >
              <Card 
                variant="outlined" 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 2px 10px lightgray';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AddIcon style={{ fontSize: 40, color: 'var(--sec)' }} /> 
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Schedule;




