// ** Route
import { Outlet } from 'react-router-dom';

// ** Mantine
import { AppShell, Box } from '@mantine/core';

// ** Components
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import LayoutSide from '@/layout/Common/layoutSide.tsx';

const SideLayout = () => {
  return (
    <AppShell
      padding={0}
      layout="alt"
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

export default SideLayout;
