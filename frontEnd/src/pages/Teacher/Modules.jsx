import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    students: 0,
    duration: '',
    studentNames: [],
  });

  const handleAddModule = () => {
    setModules([...modules, newModule]);
    setNewModule({ title: '', description: '', students: 0, duration: '', studentNames: [] });
    setOpenForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModule((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header with Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Modules</Typography>
        <Fab size="small" sx={{
            color: 'var(--wht)',
            bgcolor: 'var(--pri)',
            '&:hover': {
              backgroundColor: 'var(--sec)',
              color: '#FFFFFF',
            },
          }}  aria-label="add" onClick={() => setOpenForm(true)}>
          <AddIcon />
        </Fab>
      </Box>

      {/* Add Module Form */}
      {openForm && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={newModule.title}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            value={newModule.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Number of Students"
            name="students"
            type="number"
            value={newModule.students}
            onChange={handleInputChange}
          />
          <TextField
            label="Duration"
            name="duration"
            value={newModule.duration}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddModule}>
            Add Module
          </Button>
        </Box>
      )}

      {/* Displaying Modules */}
      <Box sx={{ marginTop: 4, display: 'grid', gap: 2 }}>
        {modules.map((module, index) => (
          <Card key={index} sx={{ maxWidth: 1200 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>{module.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{module.description}</Typography>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ marginTop: 2 }}>
                <Typography variant="body2">
                  Students: {module.students}
                </Typography>
                <Typography variant="body2">
                  Duration: {module.duration}
                </Typography>
              </Stack>
              {/* Displaying Student Avatars */}
              <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                {module.studentNames.slice(0, 3).map((name, i) => (
                  <Avatar key={i} sx={{ bgcolor: stringToColor(name) }}>
                    {name.charAt(0)}
                  </Avatar>
                ))}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

// Utility functions for color and avatar initials
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

