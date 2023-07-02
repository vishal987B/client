import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';
const FileUploaderModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleUpload = () => {
    setOpen(false);
    if (selectedFiles) {
      const formData = new FormData();
      formData.append('file', selectedFiles[0]);

      axios.post('http://localhost:8080/helper/uploadCsv',formData)
        .then((data) => {
          console.log('Upload successful', data);
          // Handle the response from the API
        window.location.reload(false);

        })
        .catch((error) => {
          console.error('Error uploading file', error);
          // Handle the error
        });
    }
      console.log("---working---", selectedFiles)
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles([]);
  };

  const handleFileSelect = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileSelect,
    multiple: false, // Allow only single file selection
    accept: '', // Specify accepted file types
  });

  return (
    <div>
      <Button startIcon={<PublishIcon />} variant="contained" color="primary" onClick={handleOpen}>
        Import
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Import items</DialogTitle>
        <DialogContent>
          <div {...getRootProps()} style={{ textAlign: 'center', padding: '20px', border: '2px dashed #ccc' }}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>
               <h1>Drag and drop files here</h1> 
               <h1>or</h1>
               <Button textTransform="lowercase" variant='outlined'> Select Files </Button>
              </p>
            
            )}
            {selectedFiles.length > 0 && (
              <div>
                <strong>Selected File:</strong> {selectedFiles[0].name}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
          <Button variant="contained" color="primary" startIcon={<CloudUpload />} onClick={handleUpload}>
            import
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUploaderModal;
