import ProTable from '@/components/ProTable';
import { tableListApi } from '@/services/apis/table.ts';

const columns = [
  {
    title: 'ID',
    key: 'id',
    width: 80,
    valueType: 'input'
  },
  {
    title: '名字',
    key: 'name',
    valueType: 'input'
  },
  {
    title: '年龄',
    key: 'age',
    valueType: 'input',
    hideInSearch: true
  },
  {
    title: '生日',
    key: 'birthday',
    width: 200,
    hideInSearch: true
  },
  {
    title: '城市',
    key: 'city',
    hideInSearch: true,
    width: 200
  },
  {
    title: '颜色',
    key: 'color',
    width: 80
  },
  {
    title: '性别',
    key: 'isMale',
    hideInSearch: true,
    width: 100
  },
  {
    title: '是否肥胖',
    key: 'isFat',
    width: 100,
    valueType: 'select',
    valueEnum: {
      1: { value: true, label: '胖' },
      2: { value: false, label: '瘦' }
    }
  },
  {
    title: '兄弟',
    key: 'brother',
    hideInSearch: true,
    width: 100
  },
  {
    title: '姐妹',
    key: 'sister',
    hideInSearch: true,
    width: 100
  },
  {
    title: '朋友',
    key: 'friends',
    hideInSearch: true,
    width: 300,
    render(row: any) {
      return row.friends.join('-');
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render() {
      return '1';
    }
  }
];

const Index = () => {
  return <ProTable columns={columns} request={tableListApi} />;
};

export default Index;
