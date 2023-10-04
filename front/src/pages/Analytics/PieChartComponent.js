import React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";

function PieChartComponent({ data }) {
  let total = data[0].value + data[1].value
  return (
    <>
      <Typography variant="h6" pt={"2rem"} mb={"-3rem"}>
        Gender Distribution<br/>
      </Typography>
      
      <PieChart
        width={500}
        height={400}
        series={[
          {
            data,
            arcLabel: (item) => `${item.value} (${(item.value / total * 100).toFixed(1)}%)`,
            innerRadius: 40,
            outerRadius: 100,
            paddingAngle: 0,
            cornerRadius: 3,
            startAngle: -90,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
      />
    </>
  );
}

export default PieChartComponent;
