import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Button, Grid } from '@mui/material';
import './App.css';
import MainCard from 'components/MainCard';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius: '10px',
  // p: 30
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
const Allocation = Loadable(lazy(() => import('pages/general-entrance-exam/Allocation')));

const ExamCenterAllocation = () => {
  const [examCenters, setExamCenters] = useState([]);
  const [allocatList, setAllocatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenterID, setSelectedCenterID] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false); // New state variable for refreshing component

  const handleOpen = (centerID) => {
    setSelectedCenterID(centerID); // Pass the centerID to the state variable
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRefresh((prevRefresh) => !prevRefresh); // Toggle the refresh state to trigger component refresh
  };

  useEffect(() => {
    axios.get('http://localhost:3001/Entrance_exam_center').then((response) => {
      setExamCenters(response.data);
    });
    axios.get('http://localhost:3001/Entrance_exam_center_allocation').then((response) => {
      setAllocatList(response.data);
    });
  }, [refresh]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getAllocationsForCenter = (centerID) => {
    const filteredAllocations = allocatList.filter(
      (allocation) => allocation.CenterID === centerID && allocation.GEApplicantID.includes(searchTerm) // Check if the GEApplicantID contains the search term
    );

    return filteredAllocations.map((allocation, index) => ({
      id: `${allocation.CenterID}_${index}`, // Assign a unique id to each row
      ...allocation
    }));
  };

  const columns = [
    // { field: 'CenterID', headerName: 'Center ID', flex: 1 },
    { field: 'GEApplicantID', headerName: 'Applicant ID', flex: 1, headerClassName: 'header' }
  ];

  const handleDeleteCenter = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:3001/Entrance_exam_center_allocation/${id}`);
        setExamCenters(examCenters.filter((center) => center.CenterID !== id));
        console.log('Allocated Applicants are deleted');
      } catch (error) {
        console.log('Error deleting Allocated Applicants', error);
      }
      setRefresh((prevRefresh) => !prevRefresh);
    }
  };

  return (
    <div>
      {examCenters.map((center) => (
        <div key={center.CenterID}>
          <MainCard>
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <h2>{center.Name}</h2>
              </Grid>
              <Grid item xs={2}>
                <h3>Capacity: {center.Capacity}</h3>
              </Grid>
              <Grid item xs={5}>
                <TextField label="Search" value={searchTerm} onChange={handleSearchTermChange} size="small" />
              </Grid>
              <Grid item xs={5}>
                <Button size="small" variant="outlined" color="error" onClick={() => handleDeleteCenter(center.CenterID)}>
                  Delete
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" onClick={() => handleOpen(center.CenterID)}>
                  Allocate
                </Button>
              </Grid>
            </Grid>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Allocation selectedCenterID={selectedCenterID} />
              </Box>
            </Modal>
            <div style={{ height: 400, width: '80%' }}>
              <DataGrid
                rows={getAllocationsForCenter(center.CenterID)}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                sx={{
                  boxShadow: 2,
                  '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main'
                  },
                  '& .header': {
                    backgroundColor: '#9fbdff',
                    color: 'black'
                  },
                  display: 'flex'
                }}
              />
            </div>
            <h1> </h1>
          </MainCard>
        </div>
      ))}
    </div>
  );
};

export default ExamCenterAllocation;
