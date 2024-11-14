//Modules.jsx to

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ModuleForm from './ModuleForm';
//import week1Image from '../../assets/
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Modules() {
  const [modules, setModules] = useState([
    {
      title: "Sample Module",
      description: "This is a sample initial description for a module.",
      duration: "2 weeks",
      image: "https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-6/277080045_5088535624536438_2564953737412717055_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGPkYQ8hY6h_KPjNZ0cvjJ57Zb0rdZCuIrtlvSt1kK4isqKAm4n-ocCcFpOlkSSCdKvYkkCvc4lEkwQSyzMeIJY&_nc_ohc=Th_wLUPfROgQ7kNvgFiXVtG&_nc_zt=23&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=AGLCn_BXmtsFZs32DbHcXvL&oh=00_AYClTKs_ladgZZ67urSH-dqQzbDWZdP_5AobtDxaI5Tf2Q&oe=673B2BD7",
    },
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  const handleAddModule = (newModule) => {
    setModules([...modules, newModule]);
    setOpenForm(false);
  };

  const handleDeleteModule = () => {
    setModules(modules.filter((module, index) => index !== moduleToDelete));
    setOpenDeleteDialog(false);
  };

  const handleOpenDeleteDialog = (index) => {
    setModuleToDelete(index);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box sx={{ padding: 4, mx: 3, mt: -3 }}>
      {/* Header with Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Modules</Typography>
        <Fab
          size="small"
          sx={{
            color: 'var(--wht)',
            bgcolor: 'var(--pri)',
            '&:hover': {
              backgroundColor: 'var(--sec)',
              color: '#FFFFFF',
            },
          }}
          aria-label="add"
          onClick={() => setOpenForm(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      {/* Module Cards */}
      <Box sx={{
        marginTop: 4,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 2,
      }}>
        {modules.map((module, index) => (
          <Card key={index} sx={{
            maxWidth: 345,
            position: 'relative',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease-in-out', 
              '&:hover': {
                transform: 'scale(1.02)', 
                boxShadow: 2, 
              },
          }}>
            <CardMedia
              component="img"
              height="140"
              image={module.image || ""}
              alt={module.title}
              sx={{
                bgcolor: module.image ? 'transparent' : '#8e56ff',
                borderRadius: '24px 24px 0 0', 
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>{module.title}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{module.description}</Typography>
              <Typography variant="body2">Duration: {module.duration}</Typography>
            </CardContent>

            {/* "Give Task" Button */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: 2,
            }}>
              <Button variant="outlined" sx={{ borderRadius: '24px', color: 'var(--sec)',
            '&:hover': {
              backgroundColor: 'rgba(0, 162, 255, 0.1)',
            }, }}>
                Give Task
              </Button>
            </Box>

            {/* More Options Button */}
            <IconButton
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => handleOpenDeleteDialog(index)}
            >
              <MoreVertIcon />
            </IconButton>
          </Card>
        ))}
      </Box>

      {/* Module Form Dialog */}
      {openForm && (
        <ModuleForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onAddModule={handleAddModule}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Module</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this module?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteModule} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
