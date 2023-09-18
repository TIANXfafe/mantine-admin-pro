import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconLock } from '@tabler/icons-react';
import { ILoginParams } from '@/services/apis/user.ts';

const AccountLogin = () => {
  const form = useForm({
    initialValues: {
      account: '',
      password: '',
      autoLogin: false
    },

    validate: {
      account: (value) => (!value ? '请输入账号' : null),
      password: (value) => (!value ? '请输入密码' : null)
    }
  });

  const handleLogin = async (values: ILoginParams) => {
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
      <Stack spacing="xs">
        <TextInput
          withAsterisk
          label="账号"
          placeholder="admin"
          icon={<IconUser size="1rem" />}
          {...form.getInputProps('account')}
        />

        <PasswordInput
          withAsterisk
          label="密码"
          placeholder="admin"
          icon={<IconLock size="1rem" />}
          {...form.getInputProps('password')}
        />

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

export default AccountLogin;
