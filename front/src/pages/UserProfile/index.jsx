import React from "react";
import { Container, Typography, Divider } from "@mui/material";
import Title from "../../components/Title";

// import UpdateDetails from "./updateDetails";
import ViewDetails from "./viewDetails";

function UserProfile() {
  return (
    <Container
      sx={{
        boxShadow: 4,
        borderRadius: "2rem",
        padding: "2rem",
        width: "100%",
      }}
    >
      <Title title="User Profile" />
      <Divider sx={{ my: 3 }} />

      <ViewDetails />
    </Container>
  );
}

export default UserProfile;
