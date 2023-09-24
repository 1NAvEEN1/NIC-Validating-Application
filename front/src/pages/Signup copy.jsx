import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [Name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  const [error, setError] = useState(true);

  const handleSignUp = () => {
    if (error === false) {
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Re-enter Password:", reEnterPassword);
      console.log(" Name:", Name);
      console.log("Address:", address);
      console.log("NIC Number:", nicNumber);
      console.log("Date of Birth:", dateOfBirth);
      console.log("Age:", age);
      console.log("Gender:", gender);
      console.log("Mobile Number:", mobileNumber);
      console.log("Service Provider:", serviceProvider);
      navigate("../login");
    }
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#C10206" }}
          >
            Sign Up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                variant="standard"
                Width
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                variant="standard"
                margin="normal"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                type="password"
                variant="standard"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Re-enter Password"
                type="password"
                variant="standard"
                margin="normal"
                value={reEnterPassword}
                onChange={(e) => setReEnterPassword(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                label="Address"
                variant="standard"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="NIC Number"
                variant="standard"
                Width
                margin="normal"
                value={nicNumber}
                onChange={(e) => setNicNumber(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                variant="standard"
                Width
                margin="normal"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Typography
            variant="h7"
            align="center"
            gutterBottom
            sx={{ alignSelf: "flex-start" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                Date of Birth: <b>{dateOfBirth}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Age : <b>{age}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Gender : <b>{gender}</b>
              </Grid>
              <Grid item xs={12} md={6}>
                Service Prover: <b>{serviceProvider}</b>
              </Grid>
            </Grid>
          </Typography>
          <Button
            variant="contained"
            color="error"
            Width
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
