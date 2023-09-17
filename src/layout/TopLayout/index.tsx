import { AppShell, Box, Header, useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { FC } from 'react';

interface IProps {
  inverted?: boolean;
}

const TopLayout: FC<IProps> = ({ inverted }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding={0}
      header={
        <Header height={48} p={0} bg={inverted ? theme.colors.dark[9] : ''}>
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

export default TopLayout;
