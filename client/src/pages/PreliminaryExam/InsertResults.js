import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Snackbar, Alert } from '@mui/material';
import MainCard from 'components/MainCard';

const InsertResults = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [saveConfirmationOpen, setSaveConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/Preliminary_exam_InsertResults').then((response) => {
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
    { field: 'RegNo', headerName: 'RegNo', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW101', headerName: 'LW 101', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW102', headerName: 'LW 102', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW103', headerName: 'LW 103', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW106', headerName: 'LW 106', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW107', headerName: 'LW 107', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW108', headerName: 'LW 108', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW109', headerName: 'LW 109', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW203', headerName: 'LW 203', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LW210', headerName: 'LW 210', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Total', headerName: 'Total', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Average', headerName: 'Average', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Grade', headerName: 'Grade', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' }
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

      const response = await axios.post('http://localhost:3001/Preliminary_exam_InsertResults/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

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

  const handleSave = () => {
    setSaveConfirmationOpen(true);
  };

  const confirmSave = async () => {
    setSaveConfirmationOpen(false);

    try {
      const response = await axios.post('http://localhost:3001/Preliminary_exam_results', filteredApplicants);
      setSuccessMessageOpen(true);
      console.log('Results saved:', response);

      const filteredData = filteredApplicants.filter((applicant) => applicant.Grade === 'PASS');
      filteredData.map(async (data) => {
        const regNo = data.RegNo;
        const response = await axios.put(`http://localhost:3001/Student_Status/${regNo}`, { RegNo: regNo, PreExamPass: 1 });
        console.log('status updated', response);
      });
    } catch (error) {
      setErrorMessage('Failed to save results:', error);
      console.error('Failed to save results:', error);
    }
  };

  const cancelSave = () => {
    setSaveConfirmationOpen(false);
  };

  const handleDelete = () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Preliminary_exam_InsertResults`);
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

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

  const handleErrorMessageClose = () => {
    setErrorMessage('');
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
          <Grid item xs={6}>
            <Button onClick={handleSubmit} disabled={!selectedFile} variant="contained" color="success">
              Upload
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleSave} variant="contained" color="success">
              Save Results
            </Button>
          </Grid>
        </Grid>
      </MainCard>
      <Grid container sx={{ marginTop: '2rem' }}>
        <Grid item xs={10}>
          <h2>Uploaded Exam Results</h2>
        </Grid>
        <Grid item xs={2}>
          <div style={{ marginTop: '0.5rem' }}>
            <TextField label="Search" variant="outlined" onChange={handleSearchChange} />
          </div>
        </Grid>
      </Grid>
      <div style={{ height: 650, width: '95%' }}>
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
      <Dialog open={saveConfirmationOpen} onClose={cancelSave}>
        <DialogTitle>Confirm Issue Admissions</DialogTitle>
        <DialogContent>Are you sure you want to Issue Admission cards?</DialogContent>
        <DialogActions>
          <Button onClick={cancelSave}>Cancel</Button>
          <Button onClick={confirmSave} color="success" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
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

      {/* Success Snackbar */}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={5000}
        onClose={handleSuccessMessageClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleSuccessMessageClose}>
          Successfully Save Exam Resutls
        </Alert>
      </Snackbar>
      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={5000}
        onClose={handleErrorMessageClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={handleErrorMessageClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InsertResults;
