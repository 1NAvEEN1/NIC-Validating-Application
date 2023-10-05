import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";

function BarGraphComponent(props) {
  const { total, Male, Female } = props.data; // Destructure the data prop
  console.log(total);
  const Total = Object.values(total);
  const male = Object.values(Male);
  const female = Object.values(Female);
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
        series={[
          { data: Total, label: "Total" },
          { data: male, label: "Male" },
          { data: female, label: "Female" },
        ]}
      />
    </>
  );
}

export default BarGraphComponent;
