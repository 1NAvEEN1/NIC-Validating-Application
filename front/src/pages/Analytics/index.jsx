import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Grid, Button, Divider } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart"; // Import BarChart
import axios from "axios";
import { useReactToPrint }from 'react-to-print'

function Analytics() {
  const [genderCounts, setGenderCounts] = useState({
    maleCount: 0,
    femaleCount: 0,
  });

  const [spCounts, setSPCounts] = useState({
    Hutch: 0,
    Dialog: 0,
  });

  const [recordsCount, setRecordsCount] = useState()

  useEffect(() => {
    // Fetch the total count of the user records
    axios
      .get("http://localhost:3001/Analytics/totalUserCount")
      .then((response) => {
        const data = response.data.totalCount;
        setRecordsCount(data);
      })
      .catch((error) => {
        console.error("Error fetching gender counts:", error);
      });
    // Fetch gender counts from the specified URL
    axios
      .get("http://localhost:3001/Analytics/GenderCounts")
      .then((response) => {
        const data = response.data;
        setGenderCounts(data);
      })
      .catch((error) => {
        console.error("Error fetching gender counts:", error);
      });

    // Fetch service provider counts from the specified URL
    axios
      .get("http://localhost:3001/Analytics/SPCounts")
      .then((response) => {
        const data = response.data;
        setSPCounts(data);
      })
      .catch((error) => {
        console.error("Error fetching service provider counts:", error);
      });
  }, []);

  const pieData = [
    {
      id: 0,
      value: genderCounts.maleCount,
      label: "Male",
      color: "#EC7063",
    },
    {
      id: 1,
      value: genderCounts.femaleCount,
      label: "Female",
      color: "#82E0AA",
    },
  ];

  const barData = Object.keys(spCounts).map((spName) => ({
    id: spName,
    value: spCounts[spName],
  }));

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Analytics'
  });

  return (
    <div>
      <Container
        sx={{
          boxShadow: 4,
          borderRadius: "2rem",
          padding: "2rem",
          width: "100%",
        }}
      ><div ref={componentRef}>
        <Typography variant="h4" gutterBottom>
          Analytics
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Grid container>
        <Grid item xs={12}>
        <Typography variant="h5" mt={4} mb={-2}>
          <div>Total number of User accounts</div> <b>{recordsCount}</b>
        </Typography>

          </Grid>
          <Grid item xs={12} md={6}>
            <PieChart
              width={500}
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
          </Grid>
          <Grid item xs={12} md={6}>
            <BarChart
              width={500}
              height={400}
              series={[
                {
                  data: barData,
                  xAccessor: (entry) => entry.id,
                  yAccessor: (entry) => entry.value,
                },
              ]}
              xScale={{ type: "band" }}
            />
          </Grid>
        </Grid>
        </div>
        <Button variant="contained" onClick={handlePrint} color="error">
            Print
          </Button>
      </Container>
    </div>
  );
}

export default Analytics;
