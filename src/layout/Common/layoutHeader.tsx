import { FC, ReactNode, useContext } from 'react';
import { Header } from '@mantine/core';
import { LayoutContext } from '@/layout/BaseLayout';

interface IProps {
  children: ReactNode;
}

const LayoutHeader: FC<IProps> = ({ children }) => {
  const { layout, headerHeight, invertedBg } = useContext(LayoutContext);

  return (
    <Header
      height={headerHeight!}
      p={0}
      bg={layout === 'top' ? invertedBg : ''}
      style={{
        transition: 'all .3s linear'
      }}
    >
      {children}
    </Header>
  );
};

export default LayoutHeader;
