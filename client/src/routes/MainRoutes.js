import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { element } from 'prop-types';

const NIC = Loadable(lazy(() => import('pages/NIC-Validation')));
const Tele = Loadable(lazy(() => import('pages/TeleNo-Validation')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/NICValidation',
      element: <NIC />
    },
    {
      path: '/TeleNoValidation',
      element: <Tele />
    }
  ]
};

export default MainRoutes;
