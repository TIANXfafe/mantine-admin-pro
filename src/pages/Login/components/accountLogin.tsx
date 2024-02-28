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
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { getUserInfoAsync, userLoginAsync } from '@/redux/reducers/user.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setMenuAsync } from '@/redux/reducers/menu.ts';

const AccountLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const handleLogin = async (values: ILoginParams) => {
    values.type = 'account';
    const res = await dispatch(userLoginAsync(values));
    if (res.type.includes('rejected')) {
      form.setFieldValue('password', '');
      return;
    }
    await dispatch(getUserInfoAsync());
    await dispatch(setMenuAsync());
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
      <Stack spacing="xs">
        <TextInput
          withAsterisk
          label={t('pages.login.account.label')}
          placeholder={t('pages.login.account.placeholder')}
          icon={<IconUser size="1rem" />}
          {...form.getInputProps('account')}
        />

        <PasswordInput
          withAsterisk
          label={t('pages.login.password.label')}
          placeholder={t('pages.login.password.placeholder')}
          icon={<IconLock size="1rem" />}
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt="md"
          label={t('pages.login.remember-me')}
          {...form.getInputProps('autoLogin', { type: 'checkbox' })}
        />

        <Button type="submit" fullWidth mt="10px" loading={loading}>
          {t('pages.login.login')}
        </Button>
      </Stack>
    </form>
  );
};

export default AccountLogin;
