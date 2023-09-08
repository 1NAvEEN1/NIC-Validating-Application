import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from '@mui/material';

const IssueAdmission = () => {
  const [issueConfirmationOpen, setIssueConfirmationOpen] = useState(false);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;

  useEffect(() => {
    axios.get('http://localhost:3001/View_allocated_applicants').then((response) => {
      const applicantsWithId = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setAllocatList(applicantsWithId);
      setFilteredApplicants(applicantsWithId);
    });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = allocatList.filter((applicant) => {
      return (
        applicant.GEApplicantID.toLowerCase().includes(value) ||
        applicant.Name.toLowerCase().includes(value) ||
        applicant.NIC.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const columns = [
    { field: 'Name', headerName: 'Exam Center Name', flex: 0.2, headerClassName: 'header' },
    { field: 'GEApplicantID', headerName: 'Applicant ID', flex: 0.2, headerClassName: 'header' },
    { field: 'NIC', headerName: 'NIC', flex: 0.2, headerClassName: 'header' },
    { field: 'GKMedium', headerName: 'GK Medium', flex: 0.2, headerClassName: 'header' },
    { field: 'LanguageMedium', headerName: 'Lang Medium', flex: 0.2, headerClassName: 'header' },
    { field: 'Date', headerName: 'Exam Date', flex: 0.2, headerClassName: 'header' },
    { field: 'GKTime', headerName: 'GK Paper Time', flex: 0.2, headerClassName: 'header' },
    { field: 'LangTime', headerName: 'Language Paper Time', flex: 0.2, headerClassName: 'header' }
  ];

  const handleIssue = async () => {
    setIssueConfirmationOpen(true);
  };

  const confirmIssue = async () => {
    setIssueConfirmationOpen(false);
    try {
      // Retrieve the list of applicant IDs from the entrance_exam_center_allocations table
      const response = await axios.get('http://localhost:3001/Entrance_exam_center_allocation');
      const applicantIDs = response.data.map((item) => item.GEApplicantID);

      // Generate index numbers and save them to the entrance_exam_admissions table
      const updatedAdmissions = await Promise.all(
        applicantIDs.map(async (applicantID, index) => {
          // Generate the index number
          const indexNumber = `${currentYear}E${(index + 1).toString().padStart(4, '0')}`;

          // Save the index number to the entrance_exam_admissions table
          const admissionData = { IndexNo: indexNumber, GEApplicantID: applicantID };
          await axios.post('http://localhost:3001/Entrance_exam_admission', admissionData);

          return { ...admissionData, indexNumber };
        })
      );

      console.log('Generated Index Numbers:', updatedAdmissions);
    } catch (error) {
      console.error('Failed to generate index numbers:', error);
    }
  };

  const cancelIssue = () => {
    setIssueConfirmationOpen(false);
  };

  return (
    <div>
      <Grid container spacing={50}>
        <Grid item xs={8}>
          <h2>Allocated Applicants</h2>
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
      <div className="issueButton">
        <Button variant="contained" onClick={handleIssue} size="large" sx={{ boxShadow: 2 }}>
          Issue Admission Cards
        </Button>
      </div>

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

export default IssueAdmission;
