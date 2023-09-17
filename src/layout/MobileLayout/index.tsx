import { Outlet } from 'react-router-dom';
import { AppShell, Box, Drawer } from '@mantine/core';
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import { useContext } from 'react';
import { LayoutContext } from '@/layout/BaseLayout';
import { useAppDispatch } from '@/utils/hooks/useAppStore.ts';
import { toggleCollapsed } from '@/redux/reducers/app.ts';

const Index = () => {
  const { collapsed, title } = useContext(LayoutContext);
  const dispatch = useAppDispatch();

  return (
    <AppShell
      padding={0}
      header={<LayoutHeader />}
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
        <Drawer
          opened={collapsed!}
          size={240}
          title={title}
          onClose={() => dispatch(toggleCollapsed(false))}
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          {/* Drawer content */}
        </Drawer>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default Index;
