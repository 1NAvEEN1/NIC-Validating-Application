import React from "react";
import { Container, Typography, Link } from "@mui/material";

import AddUser from "../../components/AddUser";

const SignupForm = () => {
  return (
    <div>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem 2rem 2rem 2rem",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#C10206" }}
        >
          Sign Up
        </Typography>
        <AddUser puka="hello" />
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
