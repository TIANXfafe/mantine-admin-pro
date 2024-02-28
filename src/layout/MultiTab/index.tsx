import { Box, rem } from '@mantine/core';
import CustomTab from '@/layout/MultiTab/CustomTab.tsx';

const MultiTab = () => {
  return (
    <Box sx={{ height: rem(48), width: '100%' }} p={6}>
      <CustomTab />
    </Box>
  );
};

export default MultiTab;
