import {
  Box,
  BackgroundImage,
  Center,
  Paper,
  SegmentedControl,
  Space,
  useMantineTheme
} from '@mantine/core';
import { IconUser, IconDeviceMobile } from '@tabler/icons-react';
import { useAppSelector } from '@/utils/hooks/useAppStore.ts';
import backgroundImg from '@/assets/images/loginBg.svg';
import { useState } from 'react';
import Logo from '@/layout/Common/logo.tsx';
import CustomTitle from '@/layout/Common/title.tsx';
import AccountLogin from './components/accountLogin.tsx';
import MobileLogin from '@/pages/Login/components/mobileLogin.tsx';

const Index = () => {
  const theme = useMantineTheme();
  const { layout } = useAppSelector((state) => state.app);

  const [value, setValue] = useState('account');

  return (
    <Box
      mx="auto"
      h="100vh"
      sx={(theme) => ({ borderRadius: theme.radius.md })}
    >
      <BackgroundImage
        src={backgroundImg}
        h="100vh"
        sx={{ backgroundSize: 'contain' }}
      >
        <Center pt="200px">
          <Paper shadow="xl" radius="md" p="md" withBorder w="350px">
            <Box
              display="flex"
              mx="auto"
              my="10px"
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Logo src={layout.logo} />
              <Space w="md" />
              <CustomTitle title={layout.title} />
            </Box>
            <SegmentedControl
              value={value}
              onChange={(value) => setValue(value)}
              fullWidth
              radius="md"
              color={theme.colors[layout.primaryColor][6]}
              data={[
                {
                  value: 'account',
                  label: (
                    <Center>
                      <IconUser size="1rem" />
                      <Box ml={10}>账号登录</Box>
                    </Center>
                  )
                },
                {
                  value: 'mobile',
                  label: (
                    <Center>
                      <IconDeviceMobile size="1rem" />
                      <Box ml={10}>手机号登录</Box>
                    </Center>
                  )
                }
              ]}
              mb="md"
            />
            {value === 'account' ? <AccountLogin /> : <MobileLogin />}
          </Paper>
        </Center>
      </BackgroundImage>
    </Box>
  );
};

export default Index;
