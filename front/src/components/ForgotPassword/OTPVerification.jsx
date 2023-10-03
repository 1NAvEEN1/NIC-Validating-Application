import React, { useState, useEffect } from "react";
import { authentication } from "../../config/firebase-config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
Grid,
  Divider,
} from "@mui/material";

import ChangePassword from "./changePassword";

function ForgotPassword(props) {
  const mobileNo = props.mobileNo;
  const auth = getAuth();
  const [otp, setOtp] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [confirmationResult, setConfirmationResult] = useState(null);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = () => {
    generateRecaptcha();
    console.log("jkf");
    let appVerifier = window.recaptchaVerifier;

    // Update the way confirmationResult is assigned
    signInWithPhoneNumber(auth, mobileNo, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult; // Assign confirmationResult here
        // SMS sent. Prompt user to type the code from the message, then store confirmationResult.
        console.log("OTP sent" + confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        setErrorMsg("Error: SMS not sent !")
        console.log(error);
      });
  };

  const verifyOTP = (e) => {
    let OTP = e.target.value;
    setOtp(OTP);
    if (OTP.length === 6) {
      console.log("OTP NOT verified");
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(OTP)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("OTP verified");

          setChangePassword(true);
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          setErrorMsg("Invalid code!")
          console.log("OTP NOT verified");
        });
    }
  };

  return (
    <div>
      {changePassword ? (
        <ChangePassword username={props.username} />
      ) : (
        <>
          <div>
            <Typography variant="h5">OTP Verification</Typography>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body2"
              align="center"
              gutterBottom
              sx={{ paddingTop: "-1rem" }}
            >
              Please enter the one-time-password sent to your mobile number{" "}
              <b>{mobileNo}</b>
            </Typography>

            <Button onClick={requestOTP} variant="contained" color="error">
              Request OTP
            </Button>
          </div>
          <TextField
            type="text"
            value={otp}
            onChange={verifyOTP}
            color="error"
            sx={{ maxWidth: "10rem", mt: "2rem" }}
            inputProps={{
              maxlength: 6,
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                letterSpacing: 5,
              },
              min: 0,
            }}
          />
           <Grid xs={12} style={{ minHeight: "3.5rem" }}>
              {errorMsg && <Typography color="error">{errorMsg}</Typography>}
            </Grid>
          <div id="recaptcha-container"></div>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
