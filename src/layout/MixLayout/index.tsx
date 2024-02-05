// ** React
import { FC, ReactElement } from 'react';

// ** Route
import { Outlet } from 'react-router-dom';

// ** Mantine
import { AppShell, Box } from '@mantine/core';

// ** Components
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import LayoutSide from '@/layout/Common/layoutSide.tsx';
import MultiTab from '@/layout/MultiTab';

interface IProps {
  headerRight?: ReactElement | string;
  sideMenu?: ReactElement;
}

const MixLayout: FC<IProps> = ({ headerRight, sideMenu }) => {
  return (
    <AppShell
      padding={0}
      header={<LayoutHeader>{headerRight}</LayoutHeader>}
      navbar={<LayoutSide>{sideMenu}</LayoutSide>}
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

export default MixLayout;
