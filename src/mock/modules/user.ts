import Mock from 'mockjs';
import setupMock from '@/utils/methods/setupMock.ts';
import { isPhone } from '@/utils/methods/regTest.ts';

setupMock({
  setup: () => {
    // 登录
    Mock.mock(new RegExp('/api/user/login'), 'post', (params) => {
      const { account, password, type, captcha, mobile } = JSON.parse(
        params.body
      );
      if (type === 'account') {
        if (!account) {
          return {
            code: -1,
            data: null,
            msg: '账号不能为空'
          };
        }
        if (!password) {
          return {
            code: -1,
            data: null,
            msg: '密码不能为空'
          };
        }
        if (account === 'admin' && password === 'admin') {
          return {
            code: 0,
            data: {
              accessToken: 'ydhw89agh9dgh0awdh'
            },
            msg: 'OK'
          };
        }
        return {
          code: -1,
          data: null,
          msg: '账号或者密码错误'
        };
      }
      if (type === 'mobile') {
        if (!mobile) {
          return {
            code: -1,
            data: null,
            msg: '手机号不能为空'
          };
        }
        if (!captcha) {
          return {
            code: -1,
            data: null,
            msg: '验证码不能为空'
          };
        }
        if (mobile && +captcha === 123456) {
          return {
            code: 0,
            data: {
              accessToken: 'ydhw89agh9dgh0awdh'
            },
            msg: 'OK'
          };
        }
        return {
          code: -1,
          data: null,
          msg: '验证码错误'
        };
      }
    });

    // 发送验证码
    Mock.mock(new RegExp('/api/user/sendCaptcha'), 'post', (params) => {
      const { mobile } = JSON.parse(params.body);
      if (isPhone(mobile)) {
        return {
          code: 0,
          data: true,
          msg: 'OK'
        };
      } else {
        return {
          code: -1,
          data: null,
          msg: '手机号格式错误'
        };
      }
    });

    Mock.mock(new RegExp('/api/user/info'), 'post', () => {
      return {
        code: 0,
        data: {
          id: 'dh9wqahdh03wahjd0awhq0juaudghb0ahywd0haw',
          account: 'admin',
          mobile: 18888888888,
          password: 'admin',
          nickname: '管理员',
          gender: 0, // 0 男  1
          address: '',
          avatar:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
          role: 'admin', // user 普通用户  admin 管理
          status: 1, // 0 未激活  1 激活  2 封
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        },
        msg: 'OK'
      };
    });
  }
});
