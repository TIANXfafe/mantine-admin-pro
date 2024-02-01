import { FC, ReactNode, useContext } from 'react';
import { createStyles, Header, Group, Burger } from '@mantine/core';
import { LayoutContext } from '@/layout/BaseLayout';
import Logo from '@/layout/Common/logo.tsx';
import CustomTitle from '@/layout/Common/title.tsx';
import { useAppDispatch } from '@/utils/hooks/useAppStore.ts';
import { toggleCollapsed } from '@/redux/reducers/app.ts';

interface IProps {
  children?: ReactNode;
}

const useStyles = createStyles({
  heightLeft: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  }
});

const LayoutHeader: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { layout, headerHeight, invertedBg, logo, title, isMobile, collapsed } =
    useContext(LayoutContext);

  const { classes } = useStyles();

  return (
    <Header
      height={headerHeight!}
      p={0}
      bg={layout === 'top' ? invertedBg : ''}
      style={{ transition: 'all .2s linear' }}
      px={10}
      display="flex"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div className={classes.heightLeft}>
        {isMobile ? (
          <Burger
            opened={collapsed!}
            onClick={() => dispatch(toggleCollapsed(!collapsed))}
            mr={8}
          />
        ) : null}
        {layout !== 'side' || isMobile ? (
          <Group spacing="xs">
            <Logo src={logo!} size={isMobile ? 24 : undefined} />
            {!isMobile ? <CustomTitle title={title} /> : null}
          </Group>
        ) : null}
      </div>
      <div className={classes.headerRight}>{children}</div>
    </Header>
  );
};

export default LayoutHeader;
