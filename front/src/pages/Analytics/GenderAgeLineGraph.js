import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";

function LineGraphComponent(props) {
  const { Male, Female } = props.data; // Destructure the data prop
  const male = Object.values(Male);
  const female = Object.values(Female);
  return (
    <>
      <Typography variant="h6" pt={"2rem"} mb={"-3rem"}>
        Gender and Age Distribution
        <br />
      </Typography>
      <LineChart
        width={500}
        height={400}
        xAxis={[
          { scaleType: "band", data: ["16 - 25", "26 - 35", "36 - 45", "46 - 55", "56 - 65", "66 - 75", "76 - 85", "86 - 95", "96 - 100"] },
        ]}
        series={[
          { data: male, label: "Male" },
          { data: female, label: "Female" },
        ]}
      />
    </>
  );
}

export default LineGraphComponent;
