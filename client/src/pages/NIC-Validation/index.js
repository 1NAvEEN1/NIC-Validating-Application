import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { TextField, Box, Radio, FormControlLabel } from '@mui/material';

const DashboardDefault = () => {
  const [age, setAge] = useState();
  const [gender, setGender] = useState('');
  const [selectedValue, setSelectedValue] = useState('New');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  var year = new Date().getFullYear();

  const validation = (event) => {
    const value = event.target.value;
    setError(false);
    if (value === '') {
      setError(true);
      setErrorMsg('Enter a NIC number!');
    } else if (value.length < 12) {
      setError(true);
      setErrorMsg('Invalid NIC number!');
    } else if (Number(value.substring(0, 4)) < 1900 || Number(value.substring(0, 4)) > 2020) {
      setError(true);
      setErrorMsg('Invalid NIC number! Age');
    } else {
      CalculateAge(value);
      Gender(value);
      setErrorMsg("");
    }
  };

  function CalculateAge(age) {
    setAge(year - Number(age.substring(0, 4)));
  }

  function Gender(gender) {
    if (Number(gender[4]) < 5) {
      setGender('Male');
    } else {
      setGender('Female');
    }
  }

  const selection = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <MainCard>
          <h3>Enter the NIC Number</h3>
          <Box sx={{ display: 'flex' }}>
            <FormControlLabel
              value="New"
              control={<Radio checked={selectedValue === 'New'} onChange={selection} value="New" name="radio-buttons" />}
              label="New"
            />
            <FormControlLabel
              value="Old"
              control={<Radio checked={selectedValue === 'Old'} onChange={selection} value="Old" name="radio-buttons" />}
              label="Old"
            />
          </Box>

          <TextField onChange={(e) => validation(e)} inputProps={{ maxLength: 12 }} type="tel" error={error} helperText={errorMsg} />

          <h4>Age: {age}</h4>
          <h4>Gender: {gender}</h4>
        </MainCard>
      </Box>
    </div>
  );
};

export default DashboardDefault;
