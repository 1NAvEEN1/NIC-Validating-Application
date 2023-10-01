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

function UpdatePassword(props) {
  let Username = props.username;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = () => {
    // Check if new password and confirm password match
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    // Send a request to your API to update the password
    axios
      .post("http://localhost:3001/Users/updatePassword", {
        UserName: Username,
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
      })
      .then((response) => {
        setMessage("Password updated successfully.");
      })
      .catch((error) => {
        setMessage("Failed to update password. Please try again.");
        console.error("Error updating password:", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Password
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Current Password"
            variant="outlined"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            color="error"
          />
        </Grid>
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
        <Grid item xs={12} style={{ minHeight: "4rem" }}>
          {message && <Typography color="error">{message}</Typography>}
        </Grid>
        <Grid item xs={12}>
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
    </Container>
  );
}

export default UpdatePassword;
