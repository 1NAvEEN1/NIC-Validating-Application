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

const InsertExamResults = Loadable(lazy(() => import('pages/general-entrance-exam/InsertExamResults')));
const GenerateGrades = Loadable(lazy(() => import('pages/general-entrance-exam/GenerateGrades')));
const PassList = Loadable(lazy(() => import('pages/general-entrance-exam/PassList')));

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
            <Tab label="Insert Exam Rusults" value={0} />
            <Tab label="Generate Grades" value={1} />
            <Tab label="Pass List" value={2} />
          </Tabs>
        </Box>
        <MainCard>
          <TabPanel value="0" index={0}>
            <InsertExamResults />
          </TabPanel>
          <TabPanel value="1" index={1}>
            <GenerateGrades />
          </TabPanel>
          <TabPanel value="2" index={2}>
            <PassList />
          </TabPanel>
        </MainCard>
      </div>
    </TabContext>
  );
};

export default DashboardDefault;
