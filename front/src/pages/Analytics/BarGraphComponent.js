import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

function BarGraphComponent(props) {
  let values = props.data
  return (
    <BarChart
      width={500}
      height={400}
      xAxis={[{scaleType: 'band', data: ["Mobitel", "Hutch", "Dialog",  "Airtel"] }]}
      series={[{ data: values}]}
    />
  );
}

export default BarGraphComponent;
