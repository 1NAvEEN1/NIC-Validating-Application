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

const entrance = {
  id: 'entrance',
  title: 'Entance Exam',
  type: 'group',
  children: [
    {
      id: 'viewApp',
      title: 'View Applicants',
      type: 'item',
      url: '/EntranceExam/viewApp',
      icon: icons.FolderViewOutlined
    },
    {
      id: 'AdmissionCard',
      title: 'Admission Cards Allocation',
      type: 'item',
      url: '/EntranceExam/AdmissionCard',
      icon: icons.FileDoneOutlined
    },
    {
      id: 'ExamResults',
      title: 'ExamResults',
      type: 'item',
      url: '/EntranceExam/ExamResults',
      icon: icons.FileProtectOutlined
    }
  ]
};

export default entrance;
