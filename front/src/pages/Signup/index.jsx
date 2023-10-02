import React from "react";
import { Container, Typography, Link } from "@mui/material";

import AddUser from "../../components/AddUser";

const SignupForm = () => {
  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: 5
        }}
      >
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{ color: "#C10206" }}
        >
          Create Account
        </Typography>
        <Typography variant="body1" align="left" marginBottom={4} >
          Unlock a World of Possibilities. <b>Join Us Today</b>
        </Typography>
        <AddUser />
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "16px" }}
        >
          Already have an account?
          <Link href="../login" color="error">
            Log In
          </Link>
        </Typography>
      </Container>
    </div>
  );
};

export default SignupForm;
