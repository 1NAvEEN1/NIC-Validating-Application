// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const validations = {
  id: 'Validations',
  title: '',
  type: 'group',
  children: [
    {
      id: 'nic',
      title: 'NIC Validation',
      type: 'item',
      url: '/NICValidation',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'Tele',
      title: 'Telephone No. Validation',
      type: 'item',
      url: '/TeleNoValidation',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default validations;
