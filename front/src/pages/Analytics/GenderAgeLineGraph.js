import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

function LineGraphComponent(props) {
  let values = props.data;
  return (
    <>
      <Typography variant="h6" pt={"2rem"} mb={"-3rem"}>
        Service Provider Distribution
        <br />
      </Typography>
      <LineChart
        width={500}
        height={400}
        xAxis={[
          { scaleType: "band", data: ["Mobitel", "Hutch", "Dialog", "Airtel"] },
        ]}
        series={[{ data: values }]}
      />
    </>
  );
}

export default LineGraphComponent;
