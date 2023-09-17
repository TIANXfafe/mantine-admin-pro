import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Box } from '@mantine/core';
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import LayoutSide from '@/layout/Common/layoutSide.tsx';

interface IProps {}

const MixLayout: FC<IProps> = () => {
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
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default MixLayout;
