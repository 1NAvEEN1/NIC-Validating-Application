import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

// import logo image
import logo from '../../../../assets/images/logo.png';

const DrawerHeader = () => {
  return (
    // only available in paid version
    <Stack direction="row" spacing={1} alignItems="center" m="0.5rem 0 1rem 0.3rem">
      <img src={logo} alt="Logo" style={{ width: '25%' }} />
      <h4 style={{ color: '#002766' }}>SRI LANKA LAW COLLEGE</h4>
    </Stack>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
