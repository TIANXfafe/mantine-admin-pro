import setupMock from '@/utils/methods/setupMock.ts';
import Mock from 'mockjs';

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/menu/list'), 'get', () => {
      return {
        code: 0,
        data: [
          {
            label: '仪表盘',
            icon: 'IconDashboard',
            children: [
              {
                label: '工作台',
                link: '/dashboard/workplace'
              },
              {
                label: '数据趋势',
                link: '/dashboard/analytics'
              },
              {
                label: 'HOME',
                link: '/dashboard/home'
              },
              {
                label: 'TEST',
                link: '/dashboard/test'
              },
              {
                label: '表单页',
                link: '/dashboard/table'
              }
            ]
          },
          {
            label: '关于',
            icon: 'IconTilde',
            link: '/about'
          }
        ],
        msg: 'OK'
      };
    });
  }
});
