import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';
import MainCard from 'components/MainCard';

const GenerateGrades = () => {
  const [subjectMarksRequirement, setSubjectMarksRequirement] = useState(40);
  const [averageMarksRequirement, setAverageMarksRequirement] = useState(50);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/View_entexm_pass_status').then((response) => {
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
        applicant.NameInFull.toLowerCase().includes(value) ||
        applicant.IndexNo.toLowerCase().includes(value) ||
        applicant.NIC.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const columns = [
    { field: 'IndexNo', headerName: 'Index No.', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'GEApplicantID', headerName: 'Applicant ID', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'NIC', headerName: 'NIC', flex: 0.2, headerClassName: 'header', headerAlign: 'center' },
    { field: 'Title', headerName: '', flex: 0.1, headerClassName: 'header' },
    { field: 'NameInFull', headerName: 'Full Name', flex: 1, headerClassName: 'header' },
    { field: 'PassStatus', headerName: 'Pass Status', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Result', headerName: 'Average', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' }
  ];

  const handleGenerateGrades = async () => {
    try {
      const response = await axios.post('http://localhost:3001/Entrance_exam_pass_list/generate', {
        subjectMarksRequirement,
        averageMarksRequirement
      });

      if (response.status === 200) {
        // Grades generated successfully
        // Do something, such as showing a success message
      } else {
        // Error occurred while generating grades
        // Do something, such as showing an error message
      }
    } catch (error) {
      console.error('Failed to generate grades:', error);
      // Handle error, such as showing an error message
    }
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Entrance_exam_pass_list`);
      console.log('Results deleted');
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.log('Error deleting Results', error);
    }
    setDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      <MainCard>
        <h2>Set the cut-off marks</h2>
        <Grid container>
          <Grid item xs={3}>
            <dv>Minimum Subject Marks Requirement</dv>
            <TextField
              // label="Minimum Subject Marks Requirement"
              type="number"
              value={subjectMarksRequirement}
              onChange={(e) => setSubjectMarksRequirement(Number(e.target.value))}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <div>Minimum Average Marks Requirement</div>
            <TextField
              // label="Minimum Average Marks Requirement"
              type="number"
              value={averageMarksRequirement}
              onChange={(e) => setAverageMarksRequirement(Number(e.target.value))}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <div style={{ marginTop: '2rem' }}>
              <Button variant="contained" onClick={handleGenerateGrades}>
                Generate Grades
              </Button>
            </div>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard>
        <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
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
      </MainCard>
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

export default GenerateGrades;
