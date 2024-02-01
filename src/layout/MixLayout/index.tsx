// ** React
import { FC, ReactElement } from 'react';

// ** Route
import { Outlet } from 'react-router-dom';

// ** Mantine
import { AppShell, Box } from '@mantine/core';

// ** Components
import LayoutHeader from '@/layout/Common/layoutHeader.tsx';
import LayoutSide from '@/layout/Common/layoutSide.tsx';

// import { changeLanguage } from 'i18next';

interface IProps {
  headerRight?: ReactElement | string;
}

const MixLayout: FC<IProps> = ({ headerRight }) => {
  return (
    <AppShell
      padding={0}
      header={<LayoutHeader>{headerRight}</LayoutHeader>}
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
        {/*<Button onClick={() => changeLanguage('zh')}>切换中文</Button>*/}
        {/*<Button onClick={() => changeLanguage('en')}>切换英文</Button>*/}
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default MixLayout;
