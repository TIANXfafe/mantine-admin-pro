import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Box, Button } from '@mantine/core';
import { changeLanguage } from 'i18next';
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import LayoutSide from '@/layout/Common/layoutSide.tsx';
import { loginApi } from '@/services/apis/user.ts';

interface IProps {}

const MixLayout: FC<IProps> = () => {
  const handleLogin = async () => {
    await loginApi({});
  };

  return (
    <AppShell
      padding={0}
      header={<LayoutHeader>Header</LayoutHeader>}
      navbar={<LayoutSide>Navbar</LayoutSide>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
    >
      <Box sx={{ height: '100%' }}>
        <Button onClick={() => changeLanguage('zh')}>切换中文</Button>
        <Button onClick={() => changeLanguage('en')}>切换英文</Button>
        <Button onClick={handleLogin}>Login</Button>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default MixLayout;
