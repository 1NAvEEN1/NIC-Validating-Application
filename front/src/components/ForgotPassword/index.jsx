import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
  Grid,
} from "@mui/material";
import axios from "axios";
import OTPVerification from "./OTPVerification";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  function convertMobileNumberFormat(mobileNumber) {
    let newMobi = "+94" + mobileNumber.slice(1);
    setMobileNo(newMobi);
  }

  const handleGetMobileNo = () => {
    // You can make an API request to fetch the mobile number based on the username
    // Replace the URL with your API endpoint
    axios
      .get(`http://localhost:3001/ForgotPW/OTP/${username}`)
      .then((response) => {
        convertMobileNumberFormat(response.data.MobileNo); // Assuming the API response has a 'mobileNo' field
        setShowVerification(true); // Show the OTP verification component
      })
      .catch((error) => {
        console.error("Error fetching mobile number:", error);
        // Handle error here, show an error message, etc.
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem 2rem 2rem 2rem",
        }}
      >
        {showVerification ? (
          <OTPVerification mobileNo={mobileNo} username={username} />
        ) : (
          <>
            <Typography variant="h5">Forgot Password?</Typography>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              sx={{ paddingTop: "-1rem" }}
            >
              Don't worry ! it happens. Enter your username associated with your
              account.
            </Typography>
            <Grid xs={12} sx={{ marginTop: "2rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Username"
                value={username}
                color="error"
                onChange={handleUsernameChange}
              />
            </Grid>
            <Grid style={{ minHeight: "3.5rem" }}>
              {errorMsg && <Typography color="error">{errorMsg}</Typography>}
            </Grid>
            <Grid xs={12} sx={{ marginBottom: "2rem" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleGetMobileNo}
              >
                Send an OTP
              </Button>
            </Grid>
          </>
        )}
        <Link
          href="../login"
          variant="body2"
          underline="hover"
          color="textSecondary"
          sx={{ marginTop: 2 }}
        >
          Back to Login
        </Link>
      </Container>
    </div>
  );
}

export default ForgotPassword;
