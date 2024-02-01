import { Button, Checkbox, NumberInput, Stack, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconDeviceMobile } from '@tabler/icons-react';
import { isPhone } from '@/utils/methods/regTest.ts';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { sendCaptchaApi } from '@/services/apis/user';
import { getUserInfoAsync, userLoginAsync } from '@/redux/reducers/user.ts';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { t } = useTranslation();

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

  const sendCaptcha = async () => {
    const { hasError } = form.validateField('mobile');
    if (hasError) {
      return;
    }
    const mobile = form.getInputProps('mobile').value;
    const res = await sendCaptchaApi({ mobile });
    if (res.code === 0 && res.data) {
      setReSendSeconds(60);
      toast.success('验证码发送成功！');
    }
  };

  const handleLogin = async (values: any) => {
    console.log(values);
    values.type = 'mobile';
    const res = await dispatch(userLoginAsync(values));
    if (res.type.includes('rejected')) {
      form.setFieldValue('captcha', '');
      return;
    }
    navigate('/', { replace: true });
    await dispatch(getUserInfoAsync());
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
          label={t('pages.login.mobile.label')}
          placeholder={t('pages.login.mobile.placeholder')}
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
            label={t('pages.login.captcha.label')}
            placeholder={t('pages.login.captcha.placeholder')}
            icon={<IconLock size="1rem" />}
            {...form.getInputProps('captcha')}
          />
          <Button onClick={sendCaptcha} disabled={reSendSeconds !== 0}>
            {reSendSeconds !== 0
              ? `${reSendSeconds}s`
              : t('pages.login.captcha.send')}
          </Button>
        </Group>

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

export default MobileLogin;
