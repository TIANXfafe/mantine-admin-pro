import { FC, ReactNode } from 'react';
import { createStyles } from '@mantine/core';

interface IProps {
  title: string;
  children: ReactNode;
}

const useStyles = createStyles({
  wrapper: {
    marginBottom: '14px'
  },
  header: {
    marginBottom: '14px',
    fontSize: '14px',
    fontWeight: 500
  }
});

const Container: FC<IProps> = ({ title, children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>{title}</div>
      {children}
    </div>
  );
};

export default Container;
