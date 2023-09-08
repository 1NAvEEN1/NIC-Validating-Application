import React, { useState, useEffect } from 'react';
import MainCard from 'components/MainCard';
import { TextField, Box } from '@mui/material/index';

const DashboardDefault = () => {
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('Male');

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <MainCard>
          <h3>Enter the NIC Number</h3>
          <TextField></TextField>
          <h4>Age :{age}</h4>
          <h4>Gender :{gender}</h4>
        </MainCard>
      </Box>
    </div>
  );
};

export default DashboardDefault;
