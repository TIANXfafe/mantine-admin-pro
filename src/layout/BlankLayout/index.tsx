import { Outlet } from 'react-router-dom';
import { Box, createStyles } from '@mantine/core';
import SelectLang from '../SelectLang';

const useStyles = createStyles({
  actionBox: {
    position: 'absolute',
    top: '1rem',
    right: '1rem'
  }
});

const BlankLayout = () => {
  const { classes } = useStyles();

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <div className={classes.actionBox}>
        <SelectLang />
      </div>
      <Outlet />
    </Box>
  );
};

export default BlankLayout;
