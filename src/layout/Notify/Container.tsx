import { FC, ReactElement } from 'react';
import { Box, ScrollArea, Divider } from '@mantine/core';
import Footer from './Footer';

interface IProps {
  children?: ReactElement;
}

const Container: FC<IProps> = ({ children }) => {
  return (
    <Box>
      <ScrollArea h={280} scrollbarSize={4} scrollHideDelay={0}>
        {children}
      </ScrollArea>
      <Divider p={0} />
      <Footer />
    </Box>
  );
};

export default Container;
