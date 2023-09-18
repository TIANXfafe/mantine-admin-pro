import { Button, Checkbox, NumberInput, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconDeviceMobile } from '@tabler/icons-react';
import { isPhone } from '@/utils/methods/regTest.ts';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const MobileLogin = () => {
  const [reSendSeconds, setReSendSeconds] = useState<number>(0);

  const form = useForm({
    initialValues: {
      mobile: '',
      captcha: '',
      autoLogin: false
    },

    validate: {
      mobile: (value) =>
        !value ? '请输入手机号' : !isPhone(value) ? '请输入正确的手机号' : null,
      captcha: (value) =>
        !value
          ? '请输入验证码'
          : value.toString().length !== 6
          ? '验证码格式错误'
          : null
    }
  });

  const sendCaptcha = () => {
    setReSendSeconds(60);
    toast.success('发送成功！');
  };

  const handleLogin = async (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    let timer: any;
    if (reSendSeconds > 0) {
      timer = setInterval(() => {
        setReSendSeconds(reSendSeconds - 1);
      }, 1000);
    } else {
      setReSendSeconds(0);
    }
    return () => {
      clearInterval(timer);
    };
  }, [reSendSeconds]);

  return (
    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
      <Stack spacing="xs">
        <NumberInput
          withAsterisk
          label="手机号"
          placeholder="admin"
          icon={<IconDeviceMobile size="1rem" />}
          {...form.getInputProps('mobile')}
        />

        <Group
          display="flex"
          sx={{ flexWrap: 'nowrap', alignItems: 'end' }}
          grow
        >
          <NumberInput
            withAsterisk
            label="密码"
            placeholder="admin"
            icon={<IconLock size="1rem" />}
            {...form.getInputProps('captcha')}
          />
          <Button onClick={sendCaptcha} disabled={reSendSeconds !== 0}>
            {reSendSeconds !== 0 ? `${reSendSeconds}s` : '发送验证码'}
          </Button>
        </Group>

        <Checkbox
          mt="md"
          label="自动登录"
          {...form.getInputProps('autoLogin', { type: 'checkbox' })}
        />

        <Button type="submit" fullWidth mt="10px">
          登录
        </Button>
      </Stack>
    </form>
  );
};

export default MobileLogin;
