import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './App.css';

// eslint-disable-next-line
const Allocation = ({ selectedCenterID }) => {
  const [allocatList, setAllocatList] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/view_to_allocate').then((response) => {
      const rowsWithId = response.data.map((row, index) => ({
        ...row,
        id: index + 1
      }));
      setAllocatList(rowsWithId);
    });
  }, []);

  const handleAllocate = () => {
    // Allocate selected applicants to exam center
    selectedApplicants.forEach((applicant) => {
      const data = {
        GEApplicantID: applicant.GEApplicantID,
        CenterID: selectedCenterID // Use the selectedCenterID prop here
      };

      axios
        .post('http://localhost:3001/Entrance_exam_center_allocation', data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    setSelectedApplicants([]);
  };

  const columns = [
    { field: 'GEApplicantID', headerName: 'Applicant ID', width: 150, headerClassName: 'header' },
    { field: 'NIC', headerName: 'NIC', width: 150, headerClassName: 'header' },
    { field: 'GKMedium', headerName: 'GK Medium', width: 150, headerClassName: 'header' },
    { field: 'LanguageMedium', headerName: 'Language Medium', width: 180, headerClassName: 'header' }
  ];

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRows = selectionModel.map((model) => allocatList.find((row) => row.id === model));
    setSelectedApplicants(selectedRows);
  };

  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allocatList}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(selectionModel) => handleSelectionModelChange(selectionModel)}
          sx={{
            boxShadow: 2,
            bgcolor: 'white',
            display: 'flex',
            p: 1
          }}
        />
      </div>
      <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleAllocate} disabled={selectedApplicants.length === 0}>
          Allocate to Exam Center
        </Button>
      </div>
    </div>
  );
};

// Allocation.propTypes = {
//   selectedCenterID: PropTypes.number.isRequired
// };

export default Allocation;
