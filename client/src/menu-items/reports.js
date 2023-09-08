// assets
import {
  FolderViewOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  CheckSquareOutlined,
  UploadOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FolderViewOutlined,
  CheckCircleOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  CheckSquareOutlined,
  UploadOutlined
};

const reports = {
  id: 'reports',
  title: 'Reports',
  type: 'group',
  children: [
    {
      id: 'transcript',
      title: 'Transtcript',
      type: 'item',
      url: '/transcript',
      icon: icons.FolderViewOutlined
    },
    // {
    //   id: 'rep',
    //   title: 'Report cards',
    //   type: 'item',
    //   url: '/report',
    //   icon: icons.FileDoneOutlined
    // }
  ]
};

export default reports;
