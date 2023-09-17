import { FC, ReactNode, useContext } from 'react';
import { createStyles, Header, Group } from '@mantine/core';
import { LayoutContext } from '@/layout/BaseLayout';
import Logo from '@/layout/Common/logo.tsx';
import CustomTitle from '@/layout/Common/title.tsx';

interface IProps {
  children: ReactNode;
}

const useStyles = createStyles({
  heightLeft: {
    display: 'flex',
    alignItems: 'center'
  },
  headerRight: {}
});

const LayoutHeader: FC<IProps> = ({ children }) => {
  const { layout, headerHeight, invertedBg, logo, title } =
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
        <Group spacing="xs">
          <Logo src={logo!} />
          <CustomTitle title={title} />
        </Group>
      </div>
      <div className={classes.headerRight}>{children}</div>
    </Header>
  );
};

export default LayoutHeader;
