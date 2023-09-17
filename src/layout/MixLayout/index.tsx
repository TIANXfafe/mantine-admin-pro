import { AppShell, Navbar, Header, Box } from '@mantine/core';

// ** Router Imports
import { Outlet } from 'react-router-dom';

const MixLayout = () => {
  return (
    <AppShell
      padding={0}
      navbar={
        <Navbar width={{ base: 240 }} height="100vh" p={0}>
          Navbar
        </Navbar>
      }
      header={
        <Header height={48} p={0}>
          Header
        </Header>
      }
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
