import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { element } from 'prop-types';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - Entrance Exam Registrations
const EntranceExamView = Loadable(lazy(() => import('pages/general-entrance-exam')));
const Admission = Loadable(lazy(() => import('pages/general-entrance-exam/admission')));
const AdmissionCard = Loadable(lazy(() => import('pages/general-entrance-exam/AdmissionCard')));
const ExamResults = Loadable(lazy(() => import('pages/general-entrance-exam/ExamResults')));
const Transcript = Loadable(lazy(() => import('pages/transcript')));
// render - Entrance Exam Registrations
const PreliminaryExam = Loadable(lazy(() => import('pages/PreliminaryExam')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'EntranceExam',
      children: [
        {
          path: 'viewApp',
          element: <EntranceExamView />
        },
        {
          path: 'AdmissionCard',
          element: <Admission />
        },
        {
          path: 'AdmissionCard/:id',
          element: <AdmissionCard />
        },
        {
          path: 'ExamResults',
          element: <ExamResults />
        }
      ]
    },
    {
      path: '',
      children: [
        {
          path: 'PreliminaryExam',
          element: <PreliminaryExam />
        },
        {
          path: 'IntermediateExam',
          element: <PreliminaryExam />
        },
        {
          path: 'FinalExam',
          element: <PreliminaryExam />
        }
      ]
    },
    {
      path: '/transcript',
      element: <Transcript />
    },
  ]
};

export default MainRoutes;
