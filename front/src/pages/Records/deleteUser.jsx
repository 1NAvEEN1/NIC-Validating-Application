import React from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";

function DeleteUser({ username, onDeleteSuccess, onClose }) {
  const handleDeleteUser = async () => {
    try {
      // Send a DELETE request to your API endpoint to delete the user
      await axios.put(`http://localhost:3001/Users/disableUser/${username}`);
      onDeleteSuccess();
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this user?
        </Typography>
      </DialogContent>

      <DialogActions>
        <Grid container spacing={2} marginBottom={"1rem"}>
          <Grid item xs={6}>
            <Button onClick={onClose} color="error" variant="outlined">
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={handleDeleteUser}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
}

export default DeleteUser;
