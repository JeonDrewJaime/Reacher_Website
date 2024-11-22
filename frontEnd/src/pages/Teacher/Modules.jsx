import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove, set, update, get } from 'firebase/database';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ModuleForm from './ModuleForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import banner from '/src/assets/bgmodule.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { List, ListItem, ListItemText, Link } from '@mui/material';

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [taskGiven, setTaskGiven] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  useEffect(() => {
    const db = getDatabase();
    const modulesRef = ref(db, 'modules');

    const unsubscribe = onValue(modulesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const modulesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setModules(modulesArray);
      } else {
        setModules([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddModule = (newModule) => {
    setOpenForm(false);
  };

  const handleDeleteModule = () => {
    if (moduleToDelete) {
      const db = getDatabase();
      const moduleRef = ref(db, `modules/${moduleToDelete}`);
      remove(moduleRef)
        .then(() => {
          setSnackbarMessage('Module deleted successfully!');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          setModuleToDelete(null);
          setOpenDeleteDialog(false);
        })
        .catch((error) => {
          console.error('Error deleting module:', error);
          setSnackbarMessage('Error deleting module!');
          setSnackbarSeverity('error'); 
          setSnackbarOpen(true);
        });
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setModuleToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setModuleToDelete(null);
  };

  const handleGiveTask = async (module) => {
    const db = getDatabase();
    const taskGivenAt = new Date().toISOString();
    
    try {
      const moduleRef = ref(db, `modules/${module.id}`);
      await update(moduleRef, { taskGivenAt });

      const sectionsRef = ref(db, 'sections');
      const snapshot = await get(sectionsRef);
      if (snapshot.exists()) {
        const sectionsData = snapshot.val();
        Object.keys(sectionsData).forEach((sectionId) => {
          const section = sectionsData[sectionId];
          if (section.students) {
            Object.keys(section.students).forEach((studentId) => {
              const studentModuleRef = ref(db, `sections/${sectionId}/students/${studentId}/module/${module.id}`);
              set(studentModuleRef, {
                ...module,
                id: module.id,
                taskGivenAt,
              });
            });
          }
        });
        setSnackbarMessage('Task given to all students successfully!');
        setSnackbarSeverity('success'); 
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('No sections found.');
        setSnackbarSeverity('error'); 
        setSnackbarOpen(true);
      }

      setTaskGiven((prev) => ({
        ...prev,
        [module.id]: true,
      }));
    } catch (error) {
      setSnackbarMessage('Error assigning task!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const isButtonDisabled = (moduleStartDate) => {
    const currentDate = new Date();
    const startDate = new Date(moduleStartDate);
    return currentDate < startDate;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4, mx: 3, mt: -3 }}>
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

      <Box
        sx={{
          marginTop: 4,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 2,
        }}
      >
        {modules.map((module) => (
          <Card key={module.id} sx={{ maxWidth: 345, position: 'relative', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="140"
              image={banner}
              alt={module.title}
              sx={{
                bgcolor: module.image ? 'transparent' : '#8e56ff',
                borderRadius: '24px 24px 0 0',
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>{module.title}</Typography>
            <Typography 
               variant="body2" 
               color="text.secondary" 
               gutterBottom 
               sx={{ textAlign: 'justify' }}
             >
             {module.description}
           </Typography>
  
          <Typography variant="body2">Duration: {module.duration}</Typography>
          {/* Render file URLs if available */}
              {module.fileURLs && module.fileURLs.length > 0 && (
               <Box sx={{ mt: 2 }}>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        gutterBottom 
        sx={{ textAlign: 'justify' }}
      >
        Attachments:
      </Typography>
      <List>
        {module.fileURLs.map((url, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={
                <Link 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  color="primary"
                >
                  View Attachment {index + 1}
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )}
</CardContent>


            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: '24px',
                  color: 'var(--sec)',
                  '&:hover': { backgroundColor: 'rgba(0, 162, 255, 0.1)' },
                }}
                onClick={() => handleGiveTask(module)}
                disabled={isButtonDisabled(module.durationStart)}
              >
                Give Task
              </Button>
            </Box>

            <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => handleOpenDeleteDialog(module.id)}>
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </Box>

      {openForm && (
        <ModuleForm open={openForm} onClose={() => setOpenForm(false)} onAddModule={handleAddModule} />
      )}

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Module</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this module?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteModule} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
        }}
      />
    </Box>
  );
}
