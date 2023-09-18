import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import { TextField, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import InputMask from 'react-input-mask';

const TeleNoValidation = () => {
  const [phone, setPhone] = useState(''); // Initialize phone state

  const onChange = (event) => {
    setPhone(event.target.value); // Update the phone state when the input changes
  };

  const handleSubmit = () => {
    // Handle form submission with the phone state
    console.log('Submitted phone number:', phone);
  };

  const handleClear = () => {
    // Clear the phone state
    setPhone('');
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <MainCard>
          <h3>Enter the Mobile Number</h3>

          <TextField name="phone" type="text" value={phone} onChange={onChange}>
            <InputMask mask="(0)99 999 9999" maskChar=" " />
          </TextField>

          <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </MainCard>
      </Box>
    </div>
  );
};

export default TeleNoValidation;
