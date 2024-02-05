// ** React
import { FC, ReactElement } from 'react';

// ** Route
import { Outlet } from 'react-router-dom';

// ** Mantine
import { AppShell, Box } from '@mantine/core';

// ** Components
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import MultiTab from '@/layout/MultiTab';

interface IProps {
  headerRight?: ReactElement | string;
}

const TopLayout: FC<IProps> = ({ headerRight }) => {
  return (
    <AppShell
      padding={0}
      header={<LayoutHeader>{headerRight}</LayoutHeader>}
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
        <MultiTab />
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default TopLayout;
