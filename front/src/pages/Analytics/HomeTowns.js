import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";

function HomeTowns() {
  const [hometowns, setHometowns] = useState([]);

  useEffect(() => {
    // Fetch the hometown counts from your API endpoint
    axios
      .get("http://localhost:3001/Analytics/homeTowns")
      .then((response) => {
        const data = response.data;
        // Convert the data to an array of objects for easier mapping
        const hometownsArray = Object.keys(data).map((hometown) => ({
          name: hometown,
          count: data[hometown],
        }));
        setHometowns(hometownsArray);
      })
      .catch((error) => {
        console.error("Error fetching hometown counts:", error);
      });
  }, []);

  return (
    <div>
        <Typography variant="h6" pt={"1rem"} >
        Hometowns
        <br />
      </Typography>
      <Grid container>
        {hometowns.map((hometown, index) => (
          <Grid item xs={6} key={index}>
            <Grid
              container
              sx={{
                boxShadow: 2,
                borderRadius: "1rem",
                padding: "1rem",
                width: "90%",
                margin: "0.5rem",
              }}
            >
              <Grid item xs={10}>
                {hometown.name}
              </Grid>
              <Grid item xs={2}>
                : {hometown.count}
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomeTowns;
