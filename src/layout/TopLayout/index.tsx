import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';

interface IProps {}

const TopLayout: FC<IProps> = () => {
  return (
    <AppShell
      padding={0}
      header={<LayoutHeader>Header</LayoutHeader>}
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
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default TopLayout;
