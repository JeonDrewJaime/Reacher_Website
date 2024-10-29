import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, ButtonBase } from '@mui/material';
import Lesson from './Lesson';

function Schedule() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Sample data for weekly lessons with modules
  const lessons = [
    { 
      week: 'Week 1', 
      topic: 'Introduction to React', 
      modules: ['What is React?', 'JSX', 'Components Overview'] 
    },
    { 
      week: 'Week 2', 
      topic: 'Components and Props', 
      modules: ['Functional Components', 'Class Components', 'Props Handling'] 
    },
    { 
      week: 'Week 3', 
      topic: 'State and Lifecycle', 
      modules: ['Using State', 'Lifecycle Methods', 'Hooks Introduction'] 
    },
    { 
      week: 'Week 4', 
      topic: 'Handling Events', 
      modules: ['Event Handling', 'Synthetic Events', 'Form Handling'] 
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
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Lesson</Typography>
        <Typography variant="h6">Section</Typography>
      </Box>

      {/* Lessons Grid */}
      <Grid container spacing={2}>
        {lessons.map((lesson, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ButtonBase onClick={() => handleCardClick(lesson)} style={{ width: '100%' }}>
              <Card variant="outlined" style={{ width: '100%' }}>
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
      </Grid>
    </Box>
  );
}

export default Schedule;
