import React from "react";
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

// import UpdateDetails from "./updateDetails";
import ViewDetails from "./viewDetails";
import EditIcon from "@mui/icons-material/Edit";
function UserProfile() {
  const handleEditClick = () => {
    
  };

  return (
    <Container
      sx={{
        boxShadow: 4,
        borderRadius: "2rem",
        padding: "2rem",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* <UpdateDetails/> */}
      <ViewDetails/>
      
    </Container>
  );
}

export default UserProfile;
