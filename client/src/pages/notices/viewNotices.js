import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Box, Button } from '@mui/material';
import MainCard from 'components/MainCard';

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch data of all notices from the database
    axios
      .get('http://localhost:3001/Notices')
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch notices:', error);
      });
  }, []);

  return (
    <div>
      <h2>View Notices</h2>
      {notices.map((notice) => (
        <MainCard key={notice.NoticeID} sx={{ boxShadow: 2, backgroundColor: '#f7fcff' }}>
          <Grid container spacing={2}>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 10px 20px', backgroundColor: '#fef9e7' }}>
                Verification Status: <b>{notice.VerificationStatus}</b>
              </Box>
            </Grid>
            <Grid item xs={1.5}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 20px 20px' }}>
                <h3>Special Date</h3>
                <td>{notice.SpecialDate}</td>
              </Box>
            </Grid>
            <Grid item xs={4.5}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 20px 20px' }}>
                <h3>Heading</h3>
                <td>{notice.Heading}</td>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 20px 20px' }}>
                <h3>Sub Heading</h3>
                <td>{notice.SubHeading}</td>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 20px 20px' }}>
                <h3>Description</h3>
                <td>{notice.Description}</td>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box borderRadius="6px" sx={{ boxShadow: 2, padding: '10px 0 20px 20px' }}>
                <h3>Department</h3>
                <td>{notice.Department}</td>
              </Box>
            </Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              <Button variant="contained" component="span" color="success" sx={{ marginTop: 3 }}>
                View PDF File
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      ))}
    </div>
  );
};

export default Notices;
