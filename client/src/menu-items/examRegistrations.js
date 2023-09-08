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

const examRegistrations = {
  id: 'exam',
  title: 'Exam Registrations',
  type: 'group',
  children: [
    {
      id: 'year1',
      title: '1st Year - Preliminary exam',
      type: 'item',
      url: '/PreliminaryExam',
      icon: icons.FolderViewOutlined
    },
    {
      id: 'year2',
      title: '2nd Year - Intermediate exam',
      type: 'item',
      url: '/IntermediateExam',
      icon: icons.FileDoneOutlined
    },
    {
      id: 'year3',
      title: '3rd Year - Final exam',
      type: 'item',
      url: '/FinalExam',
      icon: icons.FileProtectOutlined
    }
  ]
};

export default examRegistrations;
