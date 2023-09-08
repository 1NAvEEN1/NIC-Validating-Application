import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField } from '@mui/material';

const IndexNoGen = () => {
  const [issueConfirmationOpen, setIssueConfirmationOpen] = useState(false);
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const now = new Date();
  const currentYear = now.getFullYear();

  useEffect(() => {
    axios.get('http://localhost:3001/View_exam_preliminary_indexno').then((response) => {
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
        applicant.IndexNo.toString().includes(value) ||
        applicant.RegNo.toLowerCase().includes(value) ||
        applicant.SubjectID.toLowerCase().includes(value) ||
        applicant.Medium.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const columns = [
    { field: 'IndexNo', headerName: 'IndexNo', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'RegNo', headerName: 'Reg No', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'SubjectID', headerName: 'SubjectID', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Medium', headerName: 'Medium', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' }
  ];

  const handleIssue = async () => {
    setIssueConfirmationOpen(true);
  };

  const confirmIssue = async () => {
    setIssueConfirmationOpen(false);
    try {
      // Retrieve the list of applicant IDs from the entrance_exam_center_allocations table
      const response = await axios.get('http://localhost:3001/Preliminary_Exam_Regisration');
      const filteredData = response.data.filter((applicant) => applicant.PaymentVerification === 'Verified');
      const regNos = filteredData.map((item) => item.RegNo);
      const appIDs = filteredData.map((item) => item.AppID);

      // Generate index numbers and save them to the entrance_exam_admissions table
      const updatedAdmissions = await Promise.all(
        regNos.map(async (regNo, index) => {
          // Generate the index number
          const indexNumber = `${currentYear}B${(index + 1).toString().padStart(4, '0')}`;

          // Save the index number to the Preliminary_Exam_IndexNo table
          const admissionData = { IndexNo: indexNumber, RegNo: regNo, AppID: appIDs[index] };
          await axios.post('http://localhost:3001/Preliminary_Exam_IndexNo', admissionData);

          return { ...admissionData, indexNumber };
        })
      );
      setRefresh((prevRefresh) => !prevRefresh);
      console.log('Generated Index Numbers:', updatedAdmissions);
    } catch (error) {
      console.error('Failed to generate index numbers:', error);
    }
  };

  const cancelIssue = () => {
    setIssueConfirmationOpen(false);
  };

  const handleDelete = async () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Preliminary_Exam_IndexNo`);
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleIssue} size="large" sx={{ boxShadow: 2 }}>
            Issue Index Numbers
          </Button>
        </Grid>

        <Grid item xs={12}>
          <div style={{ height: 650, width: '100%' }}>
            <DataGrid
              rows={filteredApplicants}
              columns={columns}
              slots={{
                toolbar: CustomToolbar
              }}
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
          <div className="issueButton">
            <Button variant="contained" color="error" onClick={handleDelete} size="large" sx={{ boxShadow: 2 }}>
              Delete Index Numbers
            </Button>
          </div>
        </Grid>
      </Grid>

      <Dialog open={issueConfirmationOpen} onClose={cancelIssue}>
        <DialogTitle>Confirm Index Numbers</DialogTitle>
        <DialogContent>Are you sure you want to Issue Index Numbers?</DialogContent>
        <DialogActions>
          <Button onClick={cancelIssue}>Cancel</Button>
          <Button onClick={confirmIssue} color="success" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete Index Numbers</DialogTitle>
        <DialogContent>Are you sure you want to Delete Index Numbers?</DialogContent>
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

export default IndexNoGen;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// const IssueAdmission = () => {
//   const [allocatList, setAllocatList] = useState([]);
//   const [generatedIndexNumber, setGeneratedIndexNumber] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:3001/View_allocated_applicants').then((response) => {
//       const rowsWithId = response.data.map((row, index) => ({
//         ...row,
//         id: index + 1
//       }));
//       setAllocatList(rowsWithId);
//     });
//   }, []);

//   const [issueConfirmationOpen, setIssueConfirmationOpen] = useState(false);
//   const [issueCenterId, setIssueCenterId] = useState('');

//   const handleIssue = async (id) => {
//     setIssueCenterId(id);
//     setIssueConfirmationOpen(true);
//   };

//   const confirmIssue = async () => {
//     setIssueConfirmationOpen(false);
//     try {
//       const response = await axios.post('http://localhost:3001/Entrance_exam_admission/generate_index_number', {
//         GEApplicantID: issueCenterId
//       });
//       setGeneratedIndexNumber(response.data.indexNumber);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const cancelIssue = () => {
//     setIssueConfirmationOpen(false);
//   };

//   const columns = [
//     { field: 'Name', headerName: 'Exam Center Name', width: 150, headerClassName: 'header' },
//     { field: 'GEApplicantID', headerName: 'Applicant ID', width: 90, headerClassName: 'header' },
//     { field: 'NIC', headerName: 'NIC', width: 110, headerClassName: 'header' },
//     { field: 'GKMedium', headerName: 'GK Medium', width: 100, headerClassName: 'header' },
//     { field: 'LanguageMedium', headerName: 'Lang Medium', width: 100, headerClassName: 'header' },
//     { field: 'Date', headerName: 'Exam Date', width: 90, headerClassName: 'header' },
//     { field: 'GKTime', headerName: 'GK Paper Time', width: 130, headerClassName: 'header' },
//     { field: 'LangTime', headerName: 'Language Paper Time', width: 140, headerClassName: 'header' }
//   ];

//   return (
//     <div>
//       <h2>Allocated Applicants</h2>
//       <div style={{ height: 650, width: 930 }}>
//         <DataGrid
//           rows={allocatList}
//           columns={columns}
//           sx={{
//             boxShadow: 2,
//             bgcolor: 'white',
//             display: 'flex',
//             p: 1,
//             '& .header': {
//               backgroundColor: '#9fbdff',
//               color: 'black'
//             },
//             width: '100%'
//           }}
//         />
//       </div>
//       <div className="align-right">
//         <Button variant="contained" onClick={() => handleIssue()}>
//           Issue Admission Cards
//         </Button>
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={issueConfirmationOpen} onClose={cancelIssue}>
//         <DialogTitle>Confirm Issue Admissions</DialogTitle>
//         <DialogContent>Are you sure you want to Issue Admission cards?</DialogContent>
//         <DialogActions>
//           <Button onClick={cancelIssue}>Cancel</Button>
//           <Button onClick={confirmIssue} color="success" autoFocus>
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {generatedIndexNumber && (
//         <div className="index-number-container">
//           <h3>Generated Index Number:</h3>
//           <p>{generatedIndexNumber}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IssueAdmission;
