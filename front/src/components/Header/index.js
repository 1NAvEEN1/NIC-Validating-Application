import React from "react";
import Icon from "../../assets/UserIcon.png";
import { Box, Grid, Button, Container } from "@mui/material";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
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
          <Grid
            item
            xs={6}
            md={3}
            container
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                color="error"
                sx={{
                  borderRadius: "100%",
                }}
              >
                <img src={Icon} alt="Icon" style={{ maxWidth: "2rem" }} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "2rem",
                  color: "#211D21",
                  fontWeight: "bold",
                  backgroundColor: "red",
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
