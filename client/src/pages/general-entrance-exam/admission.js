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

const CenterDateTime = Loadable(lazy(() => import('pages/general-entrance-exam/examCenterDateTime')));
const CenterAllocation = Loadable(lazy(() => import('pages/general-entrance-exam/examCenterAllocation')));
const IssueAdmission = Loadable(lazy(() => import('pages/general-entrance-exam/issueAdmission')));
const Admissionlist = Loadable(lazy(() => import('pages/general-entrance-exam/admissionList')));

const DashboardDefault = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value.toString()}>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Exam Center, Date & Time" value={0} />
            <Tab label="Exam Center Allocation" value={1} />
            <Tab label="Issue Admissions" value={2} />
            <Tab label="Admission list" value={3} />
          </Tabs>
        </Box>
        <MainCard>
          <TabPanel value="0" index={0}>
            <CenterDateTime />
          </TabPanel>
          <TabPanel value="1" index={1}>
            <CenterAllocation />
          </TabPanel>
          <TabPanel value="2" index={2}>
            <IssueAdmission />
          </TabPanel>
          <TabPanel value="3" index={3}>
            <Admissionlist />
          </TabPanel>
        </MainCard>
      </div>
    </TabContext>
  );
};

export default DashboardDefault;
