import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { TextField, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const DashboardDefault = () => {
  const [NICNumber, setNICNumber] = useState('');
  const [age, setAge] = useState();
  const [gender, setGender] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [NICType, setNICType] = useState('new');
  const [letter, setLetter] = useState('V');
  const [openDialog, setOpenDialog] = useState(false);
  const [dob, setDob] = useState('');
  const [finalNIC, setFinalNIC] = useState();
  var year = new Date().getFullYear();
  var id = null;

  const validation = (event) => {
    const value = event.target.value;
    setError(false);
    setNICNumber(value);
    if (value === '') {
      setError(true);
      setErrorMsg('Enter a NIC number!');
    } else if (value.length < 12) {
      setError(true);
      setErrorMsg('Invalid NIC number!');
    } else if (Number(value.substring(0, 4)) < 1900 || Number(value.substring(0, 4)) > year) {
      setError(true);
      setErrorMsg('Invalid NIC number! Age');
    } else {
      setNICType('new');
      extractInfoFromNIC(value, 'new');
      setErrorMsg('');
    }
    setNICType('new');

    if (value.length === 9) {
      setNICType('old');
      setError(false);
      extractInfoFromNIC(value, 'old');
      setErrorMsg('');
    }
  };

  function extractInfoFromNIC(nic, type) {
    var birthYear = '';
    var days = 0;
    var genderDigit = 0;
    if (type == 'new') {
      birthYear = nic.substring(0, 4);
      days = parseInt(nic.substring(4, 7));
      genderDigit = parseInt(nic.charAt(4));
    } else if (type == 'old') {
      birthYear = `19${nic.substring(0, 2)}`;
      days = parseInt(nic.substring(2, 5));
      genderDigit = parseInt(nic.charAt(2));
    }

    const birthDate = new Date(birthYear, 0); // Initialize with the birth year
    birthDate.setDate(birthDate.getDate() + days); // Add days

    const gender = genderDigit < 5 ? 'Male' : 'Female';
    const dob = birthDate.toISOString().split('T')[0];

    const age = year - Number(birthYear);

    setDob(dob);
    setGender(gender);
    setAge(age);
  }

  const NICLetter = (event) => {
    // Allow only 'X' or 'V' and convert to uppercase
    const value = event.target.value.toUpperCase().replace(/[^XV]/g, '');
    event.target.value = value;
    setLetter(value);
  };

  const handleClear = () => {
    // Clear the form fields
    setAge('');
    setGender('');
    setError(false);
    setErrorMsg('');
    setNICNumber('');
    setNICNumber('');
  };

  const handleSubmit = () => {
    if (error == false) {
      let nicToSubmit;
      if (NICType === 'old') {
        nicToSubmit = NICNumber + letter;
      } else if (NICType === 'new') {
        nicToSubmit = NICNumber;
      }

      setFinalNIC(NICNumber);
      setOpenDialog(true);

      axios
        .post('http://localhost:3001/NIC_Validations', {
          UserID: id,
          NIC: nicToSubmit,
          DOB: dob,
          Age: age,
          Gender: gender === 'Male' ? true : false
        })
        .then(() => {
          console.log('New validation record created');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFinalNIC('');
  };

  const sanitizeInput = (event) => {
    event.target.value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <MainCard>
          <h3>Enter the NIC Number</h3>

          {NICType == 'new' ? (
            <div>
              <TextField
                type="tel"
                onChange={validation}
                onInput={sanitizeInput}
                inputProps={{ maxLength: 12 }}
                error={error}
                helperText={errorMsg}
                value={NICNumber}
                sx={{ width: '9.2rem' }}
              />
            </div>
          ) : (
            <div>
              <TextField
                type="tel"
                onChange={validation}
                inputProps={{ maxLength: 12 }}
                error={error}
                helperText={errorMsg}
                value={NICNumber}
                sx={{ width: '7rem' }}
              />
              <TextField
                onChange={NICLetter}
                inputProps={{ maxLength: 1 }} // Limit to a single character
                type="text"
                sx={{ width: '2.2rem' }}
                label={letter}
              />
            </div>
          )}
          <div>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
          </div>
        </MainCard>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>NIC Validation</DialogTitle>
        <DialogContent>
          <div>
            <h4>{finalNIC}</h4>
            <h4>Age: {age}</h4>
            <h4>Date of Birth: {dob}</h4>
            <h4>Gender: {gender}</h4>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardDefault;
