import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

function Lesson({ lesson, onBack }) {

  const modules = lesson?.modules || []; // Fallback to an empty array if undefined

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Lesson</Typography>
        <Typography variant="h6">Section</Typography>
      </Box>

      <Typography variant="h6">{lesson.week}</Typography>
      <Typography variant="body1">{lesson.topic}</Typography>

      {/* Modules Cards */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Modules:</Typography>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        {modules.length > 0 ? (
          modules.map((module, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1">{module}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No modules available.</Typography>
          </Grid>
        )}
      </Grid>

      {/* Back Button */}
      <Button variant="contained" color="primary" onClick={onBack} style={{ marginTop: '20px' }}>
        Back to Schedule
      </Button>
    </Box>
  );
}

export default Lesson;
