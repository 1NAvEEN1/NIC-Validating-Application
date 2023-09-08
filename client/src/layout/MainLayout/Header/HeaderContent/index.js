// material-ui
import { Box, Button } from '@mui/material';
// project import

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  return (
    <Box sx={{ width: '100%', ml: 1, display: 'flex', color: 'white' }}>
      <Box
        sx={{
          width: '100%',
          ml: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: '-0.5rem 0',
          padding: '0 2rem',
          color: '#bae7ff'
        }}
      >
        <h2>Examination Department</h2>
      </Box>
      <Box sx={{ width: '100%', ml: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: '#bae7ff' }}>
        <span style={{ margin: '8px' }}>User_001</span>
        <Button variant="contained" size="medium" sx={{ bgcolor: '#002766', color: '#bae7ff' }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderContent;
