import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log("Username:", username);
    console.log("Password:", password);
    navigate('../');
  };

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
        elevation={0}
      >
        <div>
          <Typography variant="h4" align="center" gutterBottom sx={{color:'#C10206'}}>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="standard"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="standard"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleSignIn}
            sx={{
                backgroundColor: "#A50113",
                borderRadius: "2rem"
              }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "16px" }}
          >
            <Link href="#" color="error">
              Forgot Password?
            </Link>
            <br/><br/>
            Don't have an account?  
            <Link href="../signup" color="error">
               Signup now
            </Link>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
