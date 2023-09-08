import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Admissionlist = () => {
  let navigate = useNavigate();
  const [refresh, setRefresh] = React.useState(false);

  const [issueConfirmationOpen, setIssueConfirmationOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/View_entexmaddmilist').then((response) => {
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
        applicant.GEApplicantID.toLowerCase().includes(value) ||
        applicant.Title.toLowerCase().includes(value) ||
        applicant.NameInFull.toLowerCase().includes(value) ||
        applicant.IndexNo.toLowerCase().includes(value) ||
        applicant.Name.toLowerCase().includes(value) ||
        applicant.NIC.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const navigateToViewDetails = (IndexNo) => {
    navigate(`/EntranceExam/AdmissionCard/${IndexNo}`);
  };

  const columns = [
    { field: 'IndexNo', headerName: 'Index No.', flex: 0.2, headerClassName: 'header' },
    { field: 'GEApplicantID', headerName: 'Applicant ID', flex: 0.2, headerClassName: 'header' },
    { field: 'NIC', headerName: 'NIC', flex: 0.2, headerClassName: 'header' },
    { field: 'Name', headerName: 'Exam Center Name', flex: 0.2, headerClassName: 'header' },
    { field: 'Title', headerName: '', flex: 0.1, headerClassName: 'header' },
    { field: 'NameInFull', headerName: 'Full Name', flex: 1, headerClassName: 'header' },
    { field: 'GKMedium', headerName: 'GK Medium', flex: 0.2, headerClassName: 'header' },
    { field: 'LanguageMedium', headerName: 'Lang Medium', flex: 0.2, headerClassName: 'header' },
    {
      field: 'actions',
      headerName: '',
      flex: 0.3,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => navigateToViewDetails(params.row.IndexNo)}>
          View
        </Button>
      )
    }
  ];

  const handleIssue = async () => {
    setIssueConfirmationOpen(true);
  };

  const confirmIssue = async () => {
    setIssueConfirmationOpen(false);
  };

  const cancelIssue = () => {
    setIssueConfirmationOpen(false);
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Entrance_exam_admission`);
      console.log('Admissions deleted');
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.log('Error deleting Admissions', error);
    }
    setDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      <Grid container spacing={50}>
        <Grid item xs={8}>
          <h2>List of Admissions</h2>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
        </Grid>
      </Grid>

      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={filteredApplicants}
          columns={columns}
          sx={{
            boxShadow: 2,
            bgcolor: 'white',
            display: 'flex',
            p: 1,
            '& .header': {
              backgroundColor: '#9fbdff',
              color: 'black'
            },
            width: '100%'
          }}
        />
      </div>
      <div style={{ marginTop: '50px' }}>
        <Grid container spacing={50}>
          <Grid item xs={8}>
            <Button variant="contained" color="error" onClick={handleDelete} size="large" sx={{ boxShadow: 2 }}>
              Delete Admissions
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleIssue} size="large" sx={{ boxShadow: 2 }}>
              Issue Admission Cards
            </Button>
          </Grid>
        </Grid>
      </div>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete Admissions</DialogTitle>
        <DialogContent>Are you sure you want to Delete Admission cards?</DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={issueConfirmationOpen} onClose={cancelIssue}>
        <DialogTitle>Confirm Issue Admissions</DialogTitle>
        <DialogContent>Are you sure you want to Issue Admission cards?</DialogContent>
        <DialogActions>
          <Button onClick={cancelIssue}>Cancel</Button>
          <Button onClick={confirmIssue} color="success" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Admissionlist;
