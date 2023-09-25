import React from "react";
import Icon from "../../assets/UserIcon.png";
import { Box, Grid, Button, Container } from "@mui/material";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("../login");
  };

  return (
    <Box sx={{ marginBottom: "5rem" }}>
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Grid item xs={3} md={1.5}>
            <img src={logo} alt="Logo" style={{ maxWidth: "100%" }} />
          </Grid>
          <Grid item xs={6} md={3} justifyContent="flex-end" spacing={1}>
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
