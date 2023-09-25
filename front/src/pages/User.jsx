import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";


function User() {

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
        <h1 style={{marginBottom:"5rem"}}>User</h1>
        
      </Container>
    </div>
  );
}

export default User;
