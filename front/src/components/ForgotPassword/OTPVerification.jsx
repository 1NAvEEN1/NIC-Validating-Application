import React, { useState } from "react";
import { authentication } from "../../config/firebase-config";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

function ForgotPassword() {
  const auth = getAuth();
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

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
    signInWithPhoneNumber(authentication, mobileNo, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then store confirmationResult.
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOTP = () => {
    if (otp.length === 6 && confirmationResult) {
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("OTP verified");
          // Handle further actions like password reset or account recovery here
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          console.log("OTP NOT verified");
        });
    }
  };

  return (
    <div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="tel"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <button onClick={requestOTP}>Request OTP</button>
      </div>
      <div id="recaptcha-container"></div>
      {confirmationResult && (
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
