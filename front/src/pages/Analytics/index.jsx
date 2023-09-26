import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

function Analytics() {
  const [genderCounts, setGenderCounts] = useState({
    maleCount: 0,
    femaleCount: 0,
  });

  useEffect(() => {
    // Fetch data from the specified URL
    axios
      .get("http://localhost:3001/Analytics/GenderCounts")
      .then((response) => {
        const data = response.data;
        setGenderCounts(data);
      })
      .catch((error) => {
        console.error("Error fetching gender counts:", error);
      });
  }, []);

  const pieData = [
    {
      id: 0,
      value: genderCounts.maleCount,
      label: "Male",
      color: "#EC7063 ",
    },
    {
      id: 1,
      value: genderCounts.femaleCount,
      label: "Female",
      color: "#82E0AA",
    },
  ];

  return (
    <div>
      <Container
        sx={{
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PieChart
            width={400}
            height={400}
            series={[
              {
                data: pieData,
                innerRadius: 40,
                outerRadius: 100,
                paddingAngle: 0,
                cornerRadius: 3,
                startAngle: -90,
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Analytics;
