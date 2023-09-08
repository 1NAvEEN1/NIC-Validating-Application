import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import MainCard from 'components/MainCard';

import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

// const PassList = Loadable(lazy(() => import('./PassList')));
const RegisteredApplicants = Loadable(lazy(() => import('./RegisteredApplicants')));
const IndexNoGen = Loadable(lazy(() => import('./IndexNoGen')));
const AdmissionDetails = Loadable(lazy(() => import('./AdmissionDetails')));
const InsertResults = Loadable(lazy(() => import('./InsertResults')));

const Default = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value.toString()}>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Registered Students" value={0} />
            <Tab label="Index No Allocation" value={1} />
            <Tab label="Admission Card Allocation" value={2} />
            <Tab label="Results" value={3} />
            {/* <Tab label="Calling Registrations" value={4} />
            <Tab label="hello" value={5} /> */}
          </Tabs>
        </Box>
        <MainCard>
          <TabPanel value="0" index={0}>
            <RegisteredApplicants />
          </TabPanel>
          <TabPanel value="1" index={1}>
            <IndexNoGen />
          </TabPanel>
          <TabPanel value="2" index={2}>
            <AdmissionDetails />
          </TabPanel>
          <TabPanel value="3" index={3}>
            <InsertResults />
          </TabPanel>
          {/* <TabPanel value="4" index={4}>
            <CallReg />
          </TabPanel>
          <TabPanel value="5" index={5}>
            <CallReg />
          </TabPanel> */}
        </MainCard>
      </div>
    </TabContext>
  );
};

export default Default;
