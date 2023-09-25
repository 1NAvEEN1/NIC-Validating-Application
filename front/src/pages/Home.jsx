import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import verificationIcon from "../assets/verificationIcon.png";
import recordsIcon from "../assets/recordsIcon.png";
import analyzeIcon from "../assets/analyzeIcon.png";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  const clickRecords = () => {
  navigate("./records");
}

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
        <h1 style={{marginBottom:"5rem"}}>Wellcome!</h1>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Container
            onClick={clickRecords}
              sx={{
                border: 2,
                borderRadius: "1rem",
                padding: "2rem",
                width: "13rem",
                height: "10rem",
                borderColor: "#ffd1d1",
                '&:hover': {
                  backgroundColor: 'error.main',
                  opacity: [0.4, 1, 0.8],
                },
              }}
            >
              <img src={recordsIcon} alt="Icon" style={{ maxWidth: "5rem" }} />
              <Typography
                variant="h6"
                align="center"
                gutterBottom
              >
                Records
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Container
              sx={{
                border: 2,
                borderRadius: "1rem",
                padding: "2rem",
                width: "100%",
                width: "13rem",
                height: "10rem",
                borderColor: "#ffd1d1",
                '&:hover': {
                  backgroundColor: 'error.main',
                  opacity: [0.4, 1, 0.8],
                },
              }}
            >
              <img src={analyzeIcon} alt="Icon" style={{ maxWidth: "5rem" }} />
              <Typography
                variant="h6"
                align="center"
                gutterBottom
              >
                Analytics
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Container
              sx={{
                border: 2,
                borderRadius: "1rem",
                padding: "2rem",
                width: "100%",
                width: "13rem",
                height: "10rem",
                borderColor: "#ffd1d1",
                '&:hover': {
                  backgroundColor: 'error.main',
                  opacity: [0.4, 1, 0.8],
                },
              }}
            >
              <img src={verificationIcon} alt="Icon" style={{ maxWidth: "5rem" }} />
              <Typography
                variant="h6"
                align="center"
                gutterBottom
              >
                Validation tool
              </Typography>
            </Container>
          </Grid>
        </Grid>
        <div style={{marginBottom:"5rem"}}></div>
      </Container>
    </div>
  );
}

export default Home;
