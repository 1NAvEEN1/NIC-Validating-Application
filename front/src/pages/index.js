import MainCard from 'components/MainCard';
import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import InputMask from 'react-input-mask';
import axios from 'axios';

const TeleNoValidation = () => {
  const [phone, setPhone] = useState('07'); // Initialize phone state
  const [serviceProvider, setServiceProvider] = useState('');
  const [errorMobile, setErrorMobile] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  var id = null;

  const onChange = (event) => {
    const inputValue = event.target.value;
    const number = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(number);
    let sp = number.charAt(2);
    setErrorMobile(true);
    if (number.length == 10) {
      setErrorMobile(false);
      setErrorMsg('');
      if (sp == '0' || sp == '1') {
        setServiceProvider('Mobitel');
      } else if (sp == '2' || sp == '8') {
        setServiceProvider('Hutch');
      } else if (sp == '3' || sp == '4' || sp == '6' || sp == '7') {
        setServiceProvider('Dialog');
      } else if (sp == '5') {
        setServiceProvider('Hutch');
      } else if (sp == '9') {
        setServiceProvider('');
        setErrorMobile(true);
        setErrorMsg('Invalid Mobile Number');
      }
    }
  };

  const handleSubmit = () => {
    // Handle form submission with the phone state
    console.log('Submitted phone number:', phone, serviceProvider);
    if (errorMobile == false) {
      axios
        .post('http://localhost:3001/Mobi_Validations', {
          UserID: id,
          MobileNo: phone,
          ServicePro: serviceProvider
        })
        .then(() => {
          console.log('New validation record created');
        })
        .catch((errorMobile) => {
          console.errorMobile(errorMobile);
        });
    }
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

          <InputMask mask="(07)9 999 9999" maskChar=" " value={phone} onChange={onChange}>
            {(inputProps) => <TextField name="phone" type="text" errorMobile={errorMobile} helperText={errorMsg} {...inputProps} />}
          </InputMask>

          <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>
          <h3>Service Provider : {serviceProvider}</h3>
        </MainCard>
      </Box>
    </div>
  );
};

export default TeleNoValidation;
