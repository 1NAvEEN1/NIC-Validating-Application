import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";

function BarGraphComponent(props) {
  let values = props.data;
  return (
    <>
      <Typography variant="h6" pt={"2rem"} mb={"-3rem"}>
        Service Provider Distribution
        <br />
      </Typography>
      <BarChart
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

export default BarGraphComponent;
