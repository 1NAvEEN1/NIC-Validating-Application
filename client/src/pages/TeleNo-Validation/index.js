import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';

const TeleNoValidation = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <MainCard>
        <Grid container sx={{ gap: '3rem', h3: { color: '#002766' }, h2: { mb: '2rem' } }}>
          <Grid item lg={4} md={3} sm={4} xs={6} sx={{ boxShadow: 2, padding: '1rem', borderRadius: '9px' }}>
            <div>
              <h3>General Entrance Exam Registered Applicants (2024)</h3>
              <h2>4580</h2>
              <h3>Verified Applicants</h3>
              <h2>3960</h2>
              <h3>Rejected Applicants</h3>
              <h2>620</h2>
              <h3>Exam Passed Applicants</h3>
              <h2>2300</h2>
              <h3>Exam Faild Applicants</h3>
              <h2>1660</h2>
            </div>
          </Grid>
          <Grid item lg={3.7} md={3} sm={4} xs={6} sx={{ boxShadow: 2, padding: '1rem', borderRadius: '9px' }}>
            <div>
              <h3>LLB Entrance Exam Registered Applicants (2024)</h3>
              <h2>2360</h2>
              <h3>Verified Applicants</h3>
              <h2>2132</h2>
              <h3>Rejected Applicants</h3>
              <h2>228</h2>
              <h3>Exam Passed Applicants</h3>
              <h2>1920</h2>
              <h3>Exam Faild Applicants</h3>
              <h2>212</h2>
            </div>
          </Grid>
        </Grid>
      </MainCard>
    </div>
  );
};

export default TeleNoValidation;
