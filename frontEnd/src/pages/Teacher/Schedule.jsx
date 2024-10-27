import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, ButtonBase } from '@mui/material';
import Lesson from './Lesson';

function Schedule() {
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
