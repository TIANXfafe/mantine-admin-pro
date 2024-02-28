import setupMock from '@/utils/methods/setupMock.ts';
import Mock from 'mockjs';

const tableData = Mock.mock({
  'data|13': [
    {
      'id|+1': 88,
      name: '@cname',
      'age|18-28': 0,
      birthday: '@date("yyyy-MM-dd")',
      city: '@city(true)',
      color: '@color',
      'isMale|1': true,
      'isFat|1-2': true,
      'brother|1': ['jack', 'jim'],
      'sister|+1': ['jack', 'jim', 'lily'],
      'friends|2': ['jack', 'jim']
    }
  ]
});

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/table/list'), 'post', (params) => {
      console.log('mock ---- data', params);
      return {
        code: 0,
        data: {
          data: tableData.data,
          total: 13,
          pageSize: 20,
          pageNo: 1
        },
        msg: 'OK'
      };
    });
  }
});
