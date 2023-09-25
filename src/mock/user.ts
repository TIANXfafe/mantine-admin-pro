import Mock from 'mockjs';
import setupMock from '@/utils/methods/setupMock.ts';
import { isPhone } from '@/utils/methods/regTest';

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
  }
});
