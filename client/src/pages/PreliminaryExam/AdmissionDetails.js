import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import MainCard from 'components/MainCard';

const AdmissionDetails = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/Preliminary_exam_admission').then((response) => {
      const applicantsWithId = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setAllocatList(applicantsWithId);
      setFilteredApplicants(applicantsWithId);
    });
  }, [refresh]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = allocatList.filter((applicant) => {
      return (
        applicant.IndexNo.toLowerCase().includes(value) ||
        applicant.RegNo.toLowerCase().includes(value) ||
        applicant.SubjectID.toLowerCase().includes(value) ||
        applicant.ExamCenter.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const columns = [
    { field: 'IndexNo', headerName: 'Index No.', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'RegNo', headerName: 'RegNo', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'SubjectID', headerName: 'SubjectID', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Medium', headerName: 'Medium', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Date', headerName: 'Date', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Time', headerName: 'Time', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'ExamCenter', headerName: 'ExamCenter', flex: 0.4, headerClassName: 'header', headerAlign: 'center', align: 'center' }
  ];

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    setSelectedFileName(file.name);
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('http://localhost:3001/Preliminary_exam_admission/upload', formData);

      if (response.status === 200) {
        // File uploaded successfully
        // Do something, such as showing a success message
      } else {
        // Error occurred while uploading the file
        // Do something, such as showing an error message
      }
    } catch (error) {
      console.error('Failed to upload file:', error);
      // Handle error, such as showing an error message
    }

    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Preliminary_exam_admission`);
      console.log('Marks deleted');
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.log('Error deleting Marks', error);
    }
    setDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      <MainCard>
        <Grid container>
          <Grid item xs={2}>
            <Button variant="contained" component="label">
              Choose File
              <input type="file" onChange={handleFileUpload} accept=".xlsx" hidden />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <div style={{ marginTop: '0.5rem' }}>{selectedFileName ? selectedFileName : ''}</div>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleSubmit} disabled={!selectedFile} variant="contained" color="success">
              Upload
            </Button>
          </Grid>
        </Grid>
      </MainCard>
      <Grid container sx={{ marginTop: '2rem' }}>
        <Grid item xs={10}>
          <h2>Allocated Applicants</h2>
        </Grid>
        <Grid item xs={2}>
          <div style={{ marginTop: '0.5rem' }}>
            <TextField label="Search" variant="outlined" onChange={handleSearchChange} />
          </div>
        </Grid>
      </Grid>
      <div style={{ height: 650, width: '98%' }}>
        <DataGrid
          rows={filteredApplicants}
          columns={columns}
          sx={{
            boxShadow: 2,
            bgcolor: 'white',
            display: 'flex',
            p: 1,
            '& .header': {
              backgroundColor: '#002766',
              color: 'white'
            },
            width: '100%'
          }}
        />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete Current Marks
        </Button>
      </div>
      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete Current Marks</DialogTitle>
        <DialogContent>Are you sure you want to Delete Current Marks?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdmissionDetails;
