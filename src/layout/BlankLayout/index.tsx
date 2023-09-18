import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';

const BlankLayout = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Outlet />
    </Box>
  );
};

export default BlankLayout;
