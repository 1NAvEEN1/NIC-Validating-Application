import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
Container,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";


const Header = () => {
  const [userID, setUserID] = useState();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const logout = () => {
    signOut();
    navigate("../login");
  };

  useEffect(() => {
      const authStateCookie = Cookies.get("_auth_state");

      if (authStateCookie) {
        try {
          const authState = JSON.parse(authStateCookie);

          if (authState && authState.Username) {
            setUserID(authState.Username);
          }
        } catch (error) {
          console.error("Error parsing _auth_state cookie:", error);
        }
      }

  }
  )

  return (
    <Box sx={{ marginBottom: "5rem" }}>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Grid item xs={3} md={2}>
            <img src={logo} alt="Logo" style={{ maxWidth: "100%" }} />
          </Grid>
          
          <Grid item xs={6} md={8} justifyContent="flex-end" spacing={1}>
{userID}
          </Grid >
          <Grid item xs={2} md={2} justifyContent="flex-end" spacing={1}>
            <div style={{ display: "flex" }}>
              
              <Button
              onClick={logout}
              variant="contained"
              color="error"
              sx={{
                borderRadius: "2rem",
                color: "#fff",
                fontWeight: "bold",
                marginLeft: "auto"
              }}
            >
              Logout
            </Button>
            </div>
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
