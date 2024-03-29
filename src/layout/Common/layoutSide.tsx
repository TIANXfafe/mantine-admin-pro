import { FC, ReactNode, useContext } from 'react';
import { createStyles, Group, Navbar, ThemeIcon } from '@mantine/core';
import { LayoutContext } from '@/layout/BaseLayout';
import { createPortal } from 'react-dom';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useAppDispatch } from '@/utils/hooks/useAppStore.ts';
import { toggleCollapsed } from '@/redux/reducers/app.ts';
import Logo from '@/layout/Common/logo.tsx';
import CustomTitle from '@/layout/Common/title.tsx';

interface IProps {
  children: ReactNode;
}

const useStyles = createStyles((_, { sideWidth }: { sideWidth: number }) => {
  return {
    collapsedWrapper: {
      position: 'fixed',
      top: '50%',
      left: `${sideWidth}px`,
      transform: `translateY(-50%) translateX(-50%)`,
      zIndex: 1001,
      transition: 'all .2s linear'
    },
    sideHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
});

const LayoutSide: FC<IProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const {
    layout,
    sideWidth,
    sideCollapsedWidth,
    invertedBg,
    collapsed,
    logo,
    title
  } = useContext(LayoutContext);

  const layoutWidth: number = collapsed ? sideCollapsedWidth! : sideWidth!;

  const { classes } = useStyles({
    sideWidth: layoutWidth
  });

  return (
    <Navbar
      width={{ base: layoutWidth }}
      height="100vh"
      p={0}
      bg={layout === 'side' ? invertedBg : ''}
      id="side"
      style={{ transition: 'all .2s linear' }}
    >
      {createPortal(
        <div
          className={classes.collapsedWrapper}
          onClick={() => dispatch(toggleCollapsed(!collapsed))}
        >
          <ThemeIcon variant="light" radius="xl">
            {collapsed ? (
              <IconChevronRight size="1rem" />
            ) : (
              <IconChevronLeft size="1rem" />
            )}
          </ThemeIcon>
        </div>,
        document.querySelector('#root') as Element
      )}
      <Navbar.Section mt="xs">
        <div className={classes.sideHeader}>
          {layout === 'side' ? (
            <Group spacing="xs">
              <Logo src={logo!} />
              {!collapsed ? <CustomTitle title={title} size={20} /> : null}
            </Group>
          ) : null}
        </div>
      </Navbar.Section>
      <Navbar.Section grow mt="xs">
        {children}
      </Navbar.Section>
    </Navbar>
  );
};

export default LayoutSide;
