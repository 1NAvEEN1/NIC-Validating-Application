import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { TextField, Grid } from '@mui/material';

const RegisteredApplicants = () => {
  const [allocatList, setAllocatList] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [Subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/Preliminary_Exam_Regisration').then((response) => {
      const applicantsWithId = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      const filteredData = applicantsWithId.filter((applicant) => applicant.PaymentVerification === 'Verified');
      setAllocatList(filteredData);
      setFilteredApplicants(filteredData);
    });

    axios.get('http://localhost:3001/Preliminary_Exam_Selected_Subjects').then((response) => {
      const subjects = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setSubjects(subjects);
    });
  }, []);

  useEffect(() => {
    const appIds = filteredApplicants.map((applicant) => applicant.AppID);
    const filteredSubjects = Subjects.filter((subject) => appIds.includes(subject.AppID));
    setFilteredSubjects(filteredSubjects);
  }, [filteredApplicants, Subjects]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = allocatList.filter((applicant) => {
      return (
        // applicant.AppID.toLowerCase().includes(value) ||
        applicant.RegNo.toLowerCase().includes(value) ||
        applicant.Year.toString().includes(value) ||
        applicant.Month.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const handleSearchSubjects = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredSubjects = Subjects.filter((subject) => {
      return (
        // subject.AppID.toLowerCase().includes(value) ||
        subject.RegNo.toLowerCase().includes(value) ||
        subject.SubjectID.toLowerCase().includes(value) ||
        subject.Medium.toLowerCase().includes(value)
      );
    });
    setFilteredSubjects(filteredSubjects);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    const filteredData = allocatList.filter((applicant) => applicant.Year === parseInt(year));
    setFilteredApplicants(filteredData);
  };

  const columns = [
    // { field: 'AppID', headerName: 'Application ID', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'RegNo', headerName: 'Reg No', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Year', headerName: 'Year', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Month', headerName: 'Month', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' }
  ];

  const columnsSub = [
    // { field: 'AppID', headerName: 'Application ID', flex: 0.1, headerClassName: 'header', headerAlign: 'center', align: 'center' },
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Filter by Year"
            variant="outlined"
            value={selectedYear}
            onChange={handleYearChange}
            style={{ marginBottom: '16px' }}
          />
          <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Search"
            variant="outlined"
            onChange={handleSearchSubjects}
            style={{ marginLeft: '1.5%', marginBottom: '16px' }}
          />
          <div style={{ height: 650, width: '100%' }}>
            <DataGrid
              rows={filteredSubjects}
              columns={columnsSub}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisteredApplicants;
