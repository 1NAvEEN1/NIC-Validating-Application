import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Button,
  IconButton,
  TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";
import axios from "axios";

function ViewDetails() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const authStateCookie = Cookies.get("_auth_state");

    if (authStateCookie) {
      try {
        const authState = JSON.parse(authStateCookie);

        if (authState && authState.Username) {
          setUserName(authState.Username);
        }
      } catch (error) {
        console.error("Error parsing _auth_state cookie:", error);
      }
    }

    axios
      .get(`http://localhost:3001/Users/${userName}`)
      .then((response) => {
        const userData = response.data;
        setUserName(userData.UserName);
        setName(userData.Name);
        setNic(userData.NIC);
        setDob(userData.DOB);
        setGender(userData.Gender);
        setAddress(userData.Address);
        setMobileNo(userData.MobileNo);
        setServiceProvider(userData.ServiceProvider);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [userName]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving updated profile data here
    // You can make a PUT request to update the user's profile
    setEditMode(false);
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode here
    setEditMode(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              User Name:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            ) : (
              <Typography>{userName}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Full Name:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <Typography>{name}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              NIC Number:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
            ) : (
              <Typography>{nic}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Date of Birth:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            ) : (
              <Typography>{dob}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Gender:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            ) : (
              <Typography>{gender}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Address:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <Typography>{address}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Mobile No.:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            ) : (
              <Typography>{mobileNo}</Typography>
            )}
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Service Provider:
            </Typography>
            {editMode ? (
              <TextField
                fullWidth
                variant="outlined"
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
              />
            ) : (
              <Typography>{serviceProvider}</Typography>
            )}
          </Grid>
        </Grid>

        {editMode ? (
          <Box mt={3}>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <IconButton
              onClick={handleCancelClick}
              sx={{ ml: 2 }}
              aria-label="cancel"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        ) : (
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="secondary"
            onClick={handleEditClick}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        )}
      </Paper>
    </Container>
  );
}

export default ViewDetails;
