import React, { useState } from 'react';
import { Box, Grid, Card, Avatar, Typography } from '@mui/material';
import { School, Person } from '@mui/icons-material';

function Data() {
  // Initializing the state for Enrolled Students and Teachers
  const [enrolledStudents] = useState(120); // Example value
  const [teachers] = useState(25); // Example value

  return (
    <div>
      {/* Box to center the content */}
      <Box sx={{ flexGrow: 1, mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          {/* Card for Enrolled Students */}
          <Grid item xs={12} sm={5} md={5} lg={5.5} xl={5.3}>
            <Card sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
              mb: 4,mr: 2,
              height: '100%', // Ensures cards stretch to full height in Grid
              display: 'flex',
              flexDirection: 'row', 
              justifyContent: 'flex-start', // Aligns the content to the left
              textAlign: 'left', // Aligns text to the left
              flex: 1, // Makes sure cards take equal space
            }}>
              <Avatar sx={{
                backgroundColor: 'var(--pri)', 
                width: 56, 
                height: 56, 
                mr: 2
              }}>
                <School sx={{ color: 'white' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h5" sx={{ color: 'var(--sec)', fontWeight: 'bold' }}>
                  Enrolled Students
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--blk)' }}>
                  {enrolledStudents} Students
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Card for Teachers */}
          <Grid item xs={12} sm={5} md={5} lg={5.5} xl={5.3}>
            <Card sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
              mb: 4,
              height: '100%', // Ensures cards stretch to full height in Grid
              display: 'flex',
              flexDirection: 'row', 
              justifyContent: 'flex-start', // Aligns the content to the left
              textAlign: 'left', // Aligns text to the left
              flex: 1, // Makes sure cards take equal space
            }}>
              <Avatar sx={{
                backgroundColor: 'var(--pri)', 
                width: 56, 
                height: 56, 
                mr: 2
              }}>
                <Person sx={{ color: 'white' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="h5" sx={{ color: 'var(--sec)', fontWeight: 'bold' }}>
                  Teachers
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--blk)' }}>
                  {teachers} Teachers
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Data;
