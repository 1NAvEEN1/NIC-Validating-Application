import React from "react";
import { Grid, Typography } from "@mui/material";

function TotalCountComponent({ count, activeCount }) {
  return (
    <Typography variant="h5">
      <Grid container>
        <Grid item xs={12} md={6}>
          Total number of User accounts : <b>{count}</b>
        </Grid>
        <Grid item xs={12} md={6}>
          Total number of Active Users : <b>{activeCount}</b>
        </Grid>
      </Grid>
    </Typography>
  );
}

export default TotalCountComponent;
