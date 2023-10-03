import React, { useEffect, useState } from "react";
import { Typography, Grid, Container, Box, IconButton } from "@mui/material";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
  });

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

          <Grid item xs={3} md={3} justifyContent="flex-end" spacing={1}>
            <div style={{ display: "flex" }}>
              <Container sx={{ paddingTop: 0 }}>
                <Typography variant="h5">{userID}</Typography>
              </Container>
              <AccountCircleIcon fontSize="large" color="error" />
              <IconButton color="error" onClick={logout} variant="outlined">
                <ExitToAppIcon color="error" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
