// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const validations = {
  id: 'activitiesActivity',
  title: 'User Activities',
  type: 'group',
  children: [
    {
      id: 'nicActivity',
      title: 'NIC Validation',
      type: 'item',
      url: '/NICValidationActivity',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'TeleActivity',
      title: 'Telephone No. Validation',
      type: 'item',
      url: '/TeleNoValidationActivity',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default validations;
