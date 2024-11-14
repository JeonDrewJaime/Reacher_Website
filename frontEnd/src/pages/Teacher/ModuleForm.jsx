//ModuleForm.jsx to
import React, { useState } from 'react';
import { db, storage } from '../../../firebase';  // Import Firebase
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Box, Button, TextField } from '@mui/material';
import Dropzone from 'react-dropzone';
import DatePicker from 'react-datepicker';
import { styled } from '@mui/material/styles';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import 'react-datepicker/dist/react-datepicker.css';  


const DatePickerWrapper = styled(Box)(({ theme }) => ({
  fontFamily: 'sans-serif', 
  '& .react-datepicker': {
    fontFamily: 'sans-serif !important', 
    width: '100%', 
    maxWidth: '100%', 
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  '& .react-datepicker__header': {
    backgroundColor: 'var(--wht)',  
    borderRadius: '8px 8px 0 0',
    color: '#fff',
    fontFamily: 'sans-serif !important', 
    fontSize: '16px',
    textAlign: 'center',
  },
  '& .react-datepicker__current-month': {
    fontFamily: 'sans-serif !important', 
    color: '#333 !important', 
    fontSize: '18px',  
  },
  '& .react-datepicker__day, .react-datepicker__day-name': {
    color: '#333',
    fontFamily: 'sans-serif !important', 
  },
  '& .react-datepicker__day--selected': {
    backgroundColor: 'var(--pri)',  
    color: '#fff',
  },
  '& .react-datepicker__day:hover': {
    backgroundColor: '#f1f1f1',
    cursor: 'pointer',
  },
  '& .react-datepicker__input-container input': {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '350px',
    fontSize: '14px',
    marginTop: '8px',
    backgroundColor: '#fafafa',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif !important', 
    '&:focus': {
      outline: 'none',
      borderColor: 'var(--gray)',  
    },
  },
}));


export default function ModuleForm({ open, onClose, onAddModule }) {
    const [moduleData, setModuleData] = useState({
        title: '',
        description: '',
        durationStart: null,
        durationEnd: null,
        image: null,
        backgroundImage: null,
        color: 'var(--pri)', 
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModuleData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleImageDrop = (acceptedFiles, imageType) => {
        if (acceptedFiles.length) {
          setModuleData((prev) => ({
            ...prev,
            [imageType]: URL.createObjectURL(acceptedFiles[0]),
          }));
        }
      };
    
      const handleDateChange = (dates) => {
        const [start, end] = dates;
        setModuleData((prev) => ({
          ...prev,
          durationStart: start,
          durationEnd: end,
        }));
      };
    
      const getDuration = () => {
        if (moduleData.durationStart && moduleData.durationEnd) {
          const diffTime = moduleData.durationEnd - moduleData.durationStart;
          const diffDays = diffTime / (1000 * 3600 * 24); 
          const weeks = Math.ceil(diffDays / 7); 
    
          if (diffDays < 7) {
            return `${diffDays} days`; 
          } else {
            return `${weeks} weeks`; 
          }
        }
        return '';
      };
    
      // Function to upload an image to Firebase Storage
      const uploadImage = (file, imageType) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `modules/${imageType}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
    
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
    
      const handleSubmit = async () => {
        try {
          const imagePromises = [];
    
          // Upload background image if any
          if (moduleData.image) {
            const imageFile = moduleData.image;
            const imageUrlPromise = uploadImage(imageFile, 'background');
            imagePromises.push(imageUrlPromise);
          }
    
          // Upload module image if any
          if (moduleData.backgroundImage) {
            const backgroundImageFile = moduleData.backgroundImage;
            const backgroundImageUrlPromise = uploadImage(backgroundImageFile, 'module');
            imagePromises.push(backgroundImageUrlPromise);
          }
    
          const imageUrls = await Promise.all(imagePromises);
    
          const newModule = {
            ...moduleData,
            duration: getDuration(),
            image: imageUrls[0] || null, // If no image, use null
            backgroundImage: imageUrls[1] || null, // If no backgroundImage, use null
          };
    
          // Save module data to Firestore
          await addDoc(collection(db, 'modules'), newModule);
    
          setModuleData({
            title: '',
            description: '',
            durationStart: null,
            durationEnd: null,
            image: null,
            backgroundImage: null,
            color: 'var(--pri)',  
          });
    
          onAddModule(newModule);  // Pass new module back to parent
          onClose();  // Close the form
        } catch (error) {
          console.error('Error adding module: ', error);
        }
      };

      return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Add New Module</DialogTitle>
          <Divider sx={{ mb: 2 }} />
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Lesson Title" name="title" value={moduleData.title} onChange={handleInputChange} />
            <TextField label="Short Description" name="description" value={moduleData.description} onChange={handleInputChange} />
    
            <Box sx={{ marginTop: 2 }}>
              <label>Duration</label>
              <DatePickerWrapper>
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
                  showTimeSelectOnly={false}
                  timeCaption="Time"
                  wrapperClassName="custom-datepicker"
                />
              </DatePickerWrapper>
            </Box>
    
            {/* Image Drop Zones */}
            <Box sx={{ marginTop: 2 }}>
              <label>Background Image</label>
              <Dropzone onDrop={(files) => handleImageDrop(files, 'image')} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <Box {...getRootProps()} sx={{ border: '2px dashed #ddd', borderRadius: 2, padding: 2, textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    {moduleData.image ? (
                      <img src={moduleData.image} alt="Module Preview" width="100%" style={{ borderRadius: 8 }} />
                    ) : (
                      <p>Drag 'n' drop an image here, or click to select one</p>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
    
            <Box sx={{ marginTop: 2 }}>
              <label>Module Image</label>
              <Dropzone onDrop={(files) => handleImageDrop(files, 'backgroundImage')} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <Box {...getRootProps()} sx={{ border: '2px dashed #ddd', borderRadius: 2, padding: 2, textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    {moduleData.backgroundImage ? (
                      <img src={moduleData.backgroundImage} alt="Background Preview" width="100%" style={{ borderRadius: 8 }} />
                    ) : (
                      <p>Drag 'n' drop an image here, or click to select one</p>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </DialogContent>
    
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button variant="outlined" onClick={handleSubmit}>Add Module</Button>
          </DialogActions>
        </Dialog>
      );
}


