import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { TextField, Grid } from '@mui/material';

const SubjectsSelection = () => {
  const [Subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/Preliminary_Exam_Selected_Subjects').then((response) => {
      const subjects = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setSubjects(subjects);
      setFilteredSubjects(subjects);
    });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredSubjects = Subjects.filter((applicant) => {
      return (
        applicant.AppID.toLowerCase().includes(value) ||
        applicant.RegNo.toLowerCase().includes(value) ||
        applicant.SubjectID.toLowerCase().includes(value) ||
        applicant.Medium.toLowerCase().includes(value)
      );
    });
    setFilteredSubjects(filteredSubjects);
  };

  const columns = [
    { field: 'AppID', headerName: 'Application ID', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'RegNo', headerName: 'Registration No', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'SubjectID', headerName: 'Subject ID', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    {
      field: 'Medium',
      headerName: 'Medium',
      flex: 0.3,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center'
    }
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
        <Grid item xs={6}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
        </Grid>
      </Grid>
      <div style={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={filteredSubjects}
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
    </div>
  );
};

export default SubjectsSelection;
