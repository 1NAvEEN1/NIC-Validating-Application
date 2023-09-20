import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel, Grid
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    // Handle sign-up logic here
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Re-enter Password:", reEnterPassword);
    console.log("Full Name:", fullName);
    console.log("Address:", address);
    console.log("NIC Number:", nicNumber);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Mobile Number:", mobileNumber);
    console.log("Service Provider:", serviceProvider);
    navigate('../');
  };

  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem 2rem 2rem 2rem",
        }}
      >
        <div>
          <Typography variant="h4" align="center" gutterBottom sx={{color:'#C10206'}}>
            Sign Up
          </Typography>
          <Grid >
            <Grid xs={5} >
              <TextField
            label="Username"
            variant="standard"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />  
            </Grid>
          <Grid xs={5} >
            <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Grid>
          
          <TextField
            label="Re-enter Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={reEnterPassword}
            onChange={(e) => setReEnterPassword(e.target.value)}
          />
          <TextField
            label="Full Name"
            variant="standard"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Address"
            variant="standard"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="NIC Number"
            variant="standard"
            fullWidth
            margin="normal"
            value={nicNumber}
            onChange={(e) => setNicNumber(e.target.value)}
          />
          <TextField
            label="Date of Birth"
            variant="standard"
            fullWidth
            margin="normal"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <TextField
            label="Age"
            variant="standard"
            fullWidth
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          </Grid>
          
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            label="Mobile Number"
            variant="standard"
            fullWidth
            margin="normal"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <TextField
            label="Service Provider"
            variant="standard"
            fullWidth
            margin="normal"
            value={serviceProvider}
            onChange={(e) => setServiceProvider(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleSignUp}
            sx={{
                backgroundColor: "#A50113",
                borderRadius: "2rem",
                marginTop: "16px",
              }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            Already have an account?  
            <Link href="../login" color="error">
              Log In
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default SignupForm;
