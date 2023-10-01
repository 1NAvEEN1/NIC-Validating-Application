import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Dialog,DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import AddUser from '../../components/AddUser';
import UpdatePassword from "./updatePassword";

function ViewDetails() {
  let userID;
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [age, setAge] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openModalPW, setOpenModalPW] = useState(false);

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
  }, [openModal]);

  const handleEditClick = () => {
    setOpenModal(true);
  };

  const handleChangePW = () => {
    setOpenModalPW(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenModalPW(false);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            User Name
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{userName}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Full Name
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Address
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{address}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            NIC Number
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{nic}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography color="error" variant="body1" sx={{ fontWeight: "bold" }}>
            Mobile No.
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>{mobileNo}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
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
        </Grid>
        <Grid item xs={12} sm={4}>
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
        </Grid>

        <Grid item xs={12} sm={4}>
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
        </Grid>
        <Grid item xs={12} sm={4}>
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
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={5}>
        <Grid item md={6}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="error"
            onClick={handleChangePW}
            sx={{ mt: 3 }}
          >
            Change Password
          </Button>
        </Grid>
        <Grid item md={6}>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="error"
            onClick={handleEditClick}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          <h3>Add User</h3>
        </DialogTitle>
        <DialogContent>
          <AddUser useFor="update" username={userName} name={name} nic={nic} dob={dob} gender={gender} address={address} mobileNo={mobileNo} serviceProvider={serviceProvider} age={age}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{mr:'45%'}} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModalPW} onClose={handleCloseModal} fullWidth maxWidth="sm">
       
        <DialogContent>
          <UpdatePassword username={userName}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{mr:'45%'}} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewDetails;
