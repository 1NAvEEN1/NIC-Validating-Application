import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";
import axios from "axios";

function UpdateDetails() {
  let userID;
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [age, setAge] = useState("");

  useEffect(() => {
    const authStateCookie = Cookies.get("_auth_state");

    if (authStateCookie) {
      try {
        const authState = JSON.parse(authStateCookie);

        if (authState && authState.Username) {
          userID = authState.Username;
          setUserName(authState.Username);
        }
      } catch (error) {
        console.error("Error parsing _auth_state cookie:", error);
      }
    }

    axios
      .get(`http://localhost:3001/Users/${userID}`)
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

        // Calculate the age based on date of birth
        const dobDate = new Date(userData.DOB);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        setAge(age);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Handle saving updated profile data here
    if ((userName, name, nic, address, mobileNo !== "")) {
      setEditMode(false);
    }
    // You can make a PUT request to update the user's profile
  };

  const handleCancelClick = () => {
    // Handle canceling the edit mode here
    setEditMode(false);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            User Name
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Full Name
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{address}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            NIC Number
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{nic}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Mobile No.
          </Typography>
          {editMode ? (
            <TextField
              fullWidth
              variant="outlined"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          ) : (
            <Typography sx={{ fontWeight: "bold" }}>{mobileNo}</Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {editMode ? (
            <div></div>
          ) : (
            <div>
              <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Date of Birth
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>{dob}</Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {editMode ? (
            <div></div>
          ) : (
            <div>
              <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Gender
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>{gender}</Typography>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={4}>
          {editMode ? (
            <div></div>
          ) : (
            <div>
              <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Service Provider
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {serviceProvider}
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          {editMode ? (
            <div></div>
          ) : (
            <div>
              <Typography
                color="error"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                Age
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>{age}</Typography>
            </div>
          )}
        </Grid>
      </Grid>

      {editMode ? (
        <Box mt={5}>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            color="error"
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
          color="error"
          onClick={handleEditClick}
          sx={{ mt: 3 }}
        >
          Edit Profile
        </Button>
      )}
    </div>
  );
}

export default UpdateDetails;
