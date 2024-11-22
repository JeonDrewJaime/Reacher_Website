import React, { useState } from 'react';
import { useFormik } from 'formik';
import { moduleSchema } from '../../validationSchema'; 
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

export default function ModuleForm({ open, onClose }) {
  const [moduleData, setModuleData] = useState({
    title: '',
    description: '',
    durationStart: null,
    durationEnd: null,
    fileURLs: [],
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form validation
  const validateForm = async () => {
    try {
      await moduleSchema.validate(moduleData, { abortEarly: false });
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      setErrorMessage(error.errors.join(', '));
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setModuleData((prev) => ({
      ...prev,
      durationStart: start,
      durationEnd: end,
    }));
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const days = differenceInDays(end, start);
    if (days === 0) {
      const hours = differenceInHours(end, start);
      if (hours === 0) {
        const minutes = differenceInMinutes(end, start);
        return minutes + ' minutes';
      }
      return hours + ' hours';
    }
    return days + ' days';
  };

  const handleDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setModuleData((prevData) => ({
      ...prevData,
      fileURLs: [...prevData.fileURLs, ...acceptedFiles.map((file) => URL.createObjectURL(file))],
    }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
    setModuleData((prevData) => ({
      ...prevData,
      fileURLs: prevData.fileURLs.filter((_, idx) => idx !== index),
    }));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return [];

    const uploadedFileURLs = [];
    try {
      setUploading(true);
      const storage = getStorage();
      for (const file of files) {
        const fileRef = storageRef(storage, `modules/${file.name}`);
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        uploadedFileURLs.push(downloadURL);
      }
    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload files.');
    } finally {
      setUploading(false);
    }
    return uploadedFileURLs;
  };

  const handleSubmit = async () => {
    // Validate form data before submission
    const isValid = await validateForm();
    if (!isValid) return;

    const duration = calculateDuration(moduleData.durationStart, moduleData.durationEnd);

    let fileURLs = [];
    if (files.length > 0) {
      fileURLs = await uploadFiles();
      if (fileURLs.length === 0) return;
    }

    const newModule = {
      ...moduleData,
      fileURLs,
      duration: duration,
      durationStart: moduleData.durationStart?.toISOString() || null,
      durationEnd: moduleData.durationEnd?.toISOString() || null,
    };

    try {
      const db = getDatabase();
      const modulesRef = ref(db, 'modules');
      await push(modulesRef, newModule);
      setSnackbarMessage('Module added successfully!');
      setSnackbarOpen(true);
      setErrorMessage('');  // Clear any previous error messages
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Failed to add module. Please try again.');
    }

    setModuleData({
      title: '',
      description: '',
      durationStart: null,
      durationEnd: null,
      fileURLs: [],
    });
    setFiles([]);
    onClose();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: true,
    accept: '.jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx',
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Add New Module</DialogTitle>
      <Divider sx={{ mb: 2 }} />
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Lesson Title"
          name="title"
          value={moduleData.title}
          onChange={handleInputChange}
          error={!moduleData.title}
          helperText={!moduleData.title ? 'Title is required' : ''}
        />
        <TextField
          label="Description"
          name="description"
          value={moduleData.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          error={!moduleData.description}
          helperText={!moduleData.description ? 'Description is required' : ''}
        />
        <Box>
          <label>Duration</label>
          <DatePicker
            selected={moduleData.durationStart}
            startDate={moduleData.durationStart}
            endDate={moduleData.durationEnd}
            onChange={handleDateChange}
            selectsRange
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="Pp"
            isClearable
            placeholderText="Select date range and time"
            minDate={new Date()}
            timeIntervals={15}
            wrapperClassName="custom-datepicker"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>Drag & Drop Attachments Here</Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #1976d2',
              padding: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#f1f8ff',
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="body2" sx={{ ml: 1 }}>or click to select files</Typography>
          </Box>
          <List>
            {files.map((file, index) => (
              <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText primary={file.name} />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        {errorMessage && (
          <Typography color="error">{errorMessage}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={uploading || !moduleData.title || !moduleData.description || !files.length}
        >
          {uploading ? 'Uploading...' : 'Add Module'}
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

