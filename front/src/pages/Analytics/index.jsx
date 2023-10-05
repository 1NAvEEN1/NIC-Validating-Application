import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Button, Divider } from "@mui/material";
import PieChartComponent from "./PieChartComponent"; // Import the PieChartComponent
import BarGraphComponent from "./BarGraphComponent"; // Import the BarGraphComponent
import TotalCountComponent from "./TotalCountComponent";
import GenderAgeLineGraph from "./GenderAgeLineGraph"
import HomeTowns from "./HomeTowns"
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Title from "../../components/Title";

function Analytics() {

  const [genderCounts, setGenderCounts] = useState({
    maleCount: 0,
    femaleCount: 0,
  });

  const [spCounts, setSPCounts] = useState({
    total: [0, 0, 0, 0],
    Male: [0, 0, 0, 0],
    Female: [0, 0, 0, 0],
  });

  const [ageGender, setAgeGender] = useState({
    Male: [0, 0, 0, 0,0, 0, 0, 0, 0],
    Female: [0, 0, 0, 0,0, 0, 0, 0, 0],
  });

  const [recordsCount, setRecordsCount] = useState();
  const [activeCount, setActiveCount] = useState();

  useEffect(() => {
    // Fetch the total count of the user records
    axios
      .get("http://localhost:3001/Analytics/totalUserCount")
      .then((response) => {
        const data = response.data.totalCount;
        setRecordsCount(data);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
      });

      axios
      .get("http://localhost:3001/Analytics/ActiveUserCount")
      .then((response) => {
        const data = response.data.activeUserCount;
        setActiveCount(data);
      })
      .catch((error) => {
        console.error("Error fetching counts:", error);
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

      axios
      .get("http://localhost:3001/Analytics/agesAndGenders")
      .then((response) => {
        const data = response.data;
        setAgeGender(data);
      })
      .catch((error) => {
        console.error("Error fetching Age and gender counts:", error);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Analytics",
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
      >
        <div ref={componentRef}>
          <Title title="Analytics" />
          <Divider sx={{ my: 3 }} />
          <Grid container marginBottom={"2rem"}>
            <Grid item xs={12}>
              <Container
                sx={{
                  boxShadow: 2,
                  borderRadius: "1rem",
                  padding: "1rem",
                  width: "100%",
                }}
              >
                <TotalCountComponent count={recordsCount} activeCount={activeCount} />{" "}
                {/* Use the TotalCountComponent */}
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container
                sx={{
                  boxShadow: 2,
                  borderRadius: "1rem",
                  width: "95%",
                  mt: "2rem",
                }}
              >
                <PieChartComponent data={pieData} />{" "}
                {/* Use the PieChartComponent */}
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container
                sx={{
                  boxShadow: 2,
                  borderRadius: "1rem",
                  width: "95%",
                  mt: "2rem",
                }}
              >
                <BarGraphComponent data={spCounts} />{" "}
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container
                sx={{
                  boxShadow: 2,
                  borderRadius: "1rem",
                  width: "95%",
                  mt: "2rem",
                }}
              >
                <GenderAgeLineGraph data={ageGender} />{" "}
              </Container>
            </Grid>
            <Grid item xs={12} md={6}>
              <Container
                sx={{
                  boxShadow: 2,
                  borderRadius: "1rem",
                  width: "95%",
                  mt: "2rem",
                }}
              >
                <HomeTowns />{" "}
              </Container>
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" onClick={handlePrint} color="error" >
          Print
        </Button>
      </Container>
    </div>
  );
}

export default Analytics;
