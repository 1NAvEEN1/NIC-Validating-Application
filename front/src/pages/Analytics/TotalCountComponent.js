import React from "react";
import { Typography } from "@mui/material";

function TotalCountComponent({ count }) {
  return (
    <Typography variant="h5" mt={4} mb={-2}>
      <div>Total number of User accounts</div> <b>{count}</b>
    </Typography>
  );
}

export default TotalCountComponent;
