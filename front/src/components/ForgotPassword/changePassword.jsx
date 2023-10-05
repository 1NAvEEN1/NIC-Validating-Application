import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";
import Successful from "../../assets/successful.png";

function ChangePassword(props) {
  let Username = props.username;

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successfullMsg, setSuccessfullMsg] = useState(false);

  const handleUpdatePassword = () => {
    if (!newPassword || !confirmNewPassword) {
      setMessage("All fields are required.");
      return;
    }
    // Check if new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    // Send a request to your API to update the password
    axios
      .post("http://localhost:3001/ForgotPW/updatePassword", {
        UserName: Username,
        NewPassword: newPassword,
      })
      .then((response) => {
        setMessage("Password updated successfully.");
        setSuccessfullMsg(true);
      })
      .catch((error) => {
        setMessage("Failed to update password. Please try again.");
        console.error("Error updating password:", error);
      });
  };

  return (
    <Container>
      {successfullMsg ? (
        <>
          <Typography variant="h4" gutterBottom>
            Password Update Successful!
          </Typography>
          <img
            src={Successful}
            // style={{ width: "100%", height: "auto" }}
          />
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ color: "#C10206" }}>
            Change Password
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={4} marginTop={"2rem"}>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                color="error"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Confirm New Password"
                variant="outlined"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                color="error"
              />
            </Grid>
            <Grid item xs={12} style={{ minHeight: "3.5rem" }}>
              {message && <Typography color="error">{message}</Typography>}
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "1.5rem" }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleUpdatePassword}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default ChangePassword;
