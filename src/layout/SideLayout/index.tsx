import { AppShell, Box, Header, Navbar, useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

interface IProps {
  inverted?: boolean;
}

const SideLayout: FC<IProps> = ({ inverted }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding={0}
      layout="alt"
      navbar={
        <Navbar
          width={{ base: 240 }}
          height="100vh"
          p={0}
          bg={inverted ? theme.colors.dark[9] : ''}
        >
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

export default SideLayout;
