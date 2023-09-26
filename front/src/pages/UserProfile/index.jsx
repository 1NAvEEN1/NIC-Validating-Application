import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios"; // Import Axios for making API requests

function UserProfile() {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState(""); // Add state variables for user details
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");

  const [userNameID, setUserNameID] = useState("");

  useEffect(() => {
    // Retrieve the _auth_state cookie
    const authStateCookie = Cookies.get("_auth_state");

    // Check if the cookie exists and is not empty
    if (authStateCookie) {
      try {
        // Parse the JSON data in the cookie
        const authState = JSON.parse(authStateCookie);

        // Check if the "Username" property exists in the parsed data
        if (authState && authState.Username) {
          // Set the username in the state
          setUserNameID(authState.Username);
        }
      } catch (error) {
        console.error("Error parsing _auth_state cookie:", error);
      }
    }
  }, []);

  useEffect(() => {
    const authStateCookie = Cookies.get("_auth_state");

    // Check if the cookie exists and is not empty
    if (authStateCookie) {
      try {
        // Parse the JSON data in the cookie
        const authState = JSON.parse(authStateCookie);

        // Check if the "Username" property exists in the parsed data
        if (authState && authState.Username) {
          // Set the username in the state
          setUserNameID(authState.Username);
        }
      } catch (error) {
        console.error("Error parsing _auth_state cookie:", error);
      }
    }

    // Make a GET request to fetch user details based on the ID
    axios
      .get(`http://localhost:3001/Users/${userNameID}`)
      .then((response) => {
        const userData = response.data;
        // Set the user details in the state
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
  }, [userNameID]);

  const handleUpdateProfile = () => {
    // Prepare the updated user profile data
    const updatedProfile = {
      Name: name,
      NIC: nic,
      DOB: dob,
      Gender: gender,
      Address: address,
      MobileNo: mobileNo,
      ServiceProvider: serviceProvider,
    };

    // Make a PUT request to update the user's profile
    axios
      .put(`http://localhost:3001/Users/${userNameID}`, updatedProfile)
      .then((response) => {
        console.log("User profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  return (
    <div>
      <Container
        // maxWidth="xs"
        sx={{
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem",
          width: "100%",
        }}
      >
        <h1 style={{ marginBottom: "5rem" }}>User Profile</h1>
        <h2>UserName: {userNameID}</h2>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled
        />
        {/* Add similar TextField components for other user details */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleUpdateProfile}
          sx={{
            backgroundColor: "#A50113",
            borderRadius: "2rem",
          }}
        >
          Update Profile
        </Button>
      </Container>
    </div>
  );
}

export default UserProfile;
