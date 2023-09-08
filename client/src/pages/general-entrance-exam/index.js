import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

const ViewApplicants = () => {
  let navigate = useNavigate();

  const [listOfApplicants, setListOfApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/View_gea_qualified_applicants')
      .then((response) => {
        const applicantsWithId = response.data.map((applicant) => ({
          ...applicant,
          id: applicant.GEApplicantID // Add the id property using GEApplicantID
        }));
        setListOfApplicants(applicantsWithId);
        setFilteredApplicants(applicantsWithId);
      })
      .catch((error) => {
        console.error('Error fetching applicants:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = listOfApplicants.filter((applicant) => {
      return (
        applicant.GEApplicantID.toLowerCase().includes(value) ||
        applicant.Title.toLowerCase().includes(value) ||
        applicant.NameInFull.toLowerCase().includes(value) ||
        applicant.NIC.toLowerCase().includes(value)
      );
    });
    setFilteredApplicants(filteredData);
  };

  const navigateToViewDetails = (GEApplicantID) => {
    navigate(`/viewApp/${GEApplicantID}`);
  };

  const columns = [
    { field: 'GEApplicantID', headerName: 'Applicant ID', flex: 0.3, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    { field: 'Title', headerName: 'Title', flex: 0.1, headerClassName: 'header', align: 'right' },
    { field: 'NameInFull', headerName: 'Full Name', flex: 1, headerClassName: 'header', headerAlign: 'center' },
    { field: 'NIC', headerName: 'NIC', flex: 0.5, headerClassName: 'header', headerAlign: 'center', align: 'center' },
    {
      field: 'GKMedium',
      headerName: 'General Knowledge Paper Medium',
      flex: 0.3,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'LanguageMedium',
      headerName: 'Language Paper Medium',
      flex: 0.3,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.3,
      headerClassName: 'header',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => navigateToViewDetails(params.row.GEApplicantID)}>
          View
        </Button>
      )
    }
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div>
      <MainCard>
        <TextField label="Search" variant="outlined" onChange={handleSearchChange} style={{ marginLeft: '1.5%', marginBottom: '16px' }} />
        <div style={{ height: '700px', width: '100%' }}>
          <DataGrid
            rows={filteredApplicants}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              Toolbar: CustomToolbar
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
            disableColumnMenu
          />
        </div>
      </MainCard>
    </div>
  );
};

export default ViewApplicants;
