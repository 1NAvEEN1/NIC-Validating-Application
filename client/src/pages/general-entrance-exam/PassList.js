import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { TextField, Grid } from '@mui/material';

const PassList = () => {
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/View_entexm_pass_list').then((response) => {
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
    { field: 'GKMarks', headerName: 'GK Mrks', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'LangMarks', headerName: 'Lang Marks', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Result', headerName: 'Average', flex: 0.2, headerClassName: 'header', headerAlign: 'center', align: 'center' }
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={10}>
          <h2>Pass Applicant List</h2>
        </Grid>
        <Grid item xs={2}>
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
        </Grid>
      </Grid>
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
              backgroundColor: '#9fbdff',
              color: 'black'
            },
            width: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default PassList;
