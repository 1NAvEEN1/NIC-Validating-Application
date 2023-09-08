import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainCard from 'components/MainCard';

const PostNotices = Loadable(lazy(() => import('pages/notices/postNotices')));
const ViewNotices = Loadable(lazy(() => import('pages/notices/viewNotices')));

const Notices = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value.toString()}>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Post Notices" value={0} />
            <Tab label="View Posts" value={1} />
            {/* <Tab label="Registered Applicants" value={2} /> */}
          </Tabs>
        </Box>
        <MainCard>
          <TabPanel value="0" index={0}>
            <PostNotices />
          </TabPanel>
          <TabPanel value="1" index={1}>
            <ViewNotices />
          </TabPanel>
          {/* <TabPanel value="2" index={1}>
            <RegisteredApplicants />
          </TabPanel> */}
        </MainCard>
      </div>
    </TabContext>
  );
};

export default Notices;
