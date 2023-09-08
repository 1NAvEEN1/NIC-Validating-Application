// material-ui
import { Box, Button } from '@mui/material';
// project import

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  return (
    <Box sx={{ width: '100%', ml: 1, display: 'flex', color: 'black', BoxShadow: '5px 10px' }}>
      <Box
        sx={{
          width: '100%',
          ml: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: '-0.5rem 0',
          padding: '0 2rem',
        }}
      >
        <h2>NIC Validation Application</h2>
      </Box>
      <Box sx={{ width: '100%', ml: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'black' }}>
        <span style={{ margin: '8px' }}>User_001</span>
        <Button variant="contained" size="medium" sx={{ bgcolor: '#EBEBEB', color: 'black' }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderContent;
