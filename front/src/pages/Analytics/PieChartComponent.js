import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

function PieChartComponent({ data }) {
  return (
    <PieChart
      width={500}
      height={400}
      series={[
        {
          data,
          innerRadius: 40,
          outerRadius: 100,
          paddingAngle: 0,
          cornerRadius: 3,
          startAngle: -90,
        },
      ]}
    />
  );
}

export default PieChartComponent;
