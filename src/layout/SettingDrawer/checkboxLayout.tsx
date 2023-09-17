import { FC } from 'react';
import {
  createStyles,
  Tooltip,
  ActionIcon,
  Box,
  MantineTheme
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

interface IProps {
  layout?: 'mix' | 'side' | 'top';
  checked?: boolean;
  title?: string;
  dark?: boolean;
  inverted?: boolean;
  onClick?: (layout: string) => void;
}

export type TUseStyles = {
  layout: 'mix' | 'side' | 'top';
  dark: boolean;
  inverted: boolean;
};

const useStyles = createStyles(
  (theme, { layout, dark, inverted }: TUseStyles) => {
    const themeDark = theme.colorScheme === 'dark';
    let headerStyle = {};
    let sideStyle = {};
    if (layout === 'mix' || layout === 'top' || dark) {
      headerStyle = {
        background: theme.black
      };
    }
    if (layout === 'side') {
      headerStyle = {
        background: dark ? theme.colors.dark[8] : theme.white
      };
    }
    if (layout === 'mix') {
      sideStyle = {
        background: dark ? theme.colors.dark[8] : theme.white,
        height: '75%',
        bottom: 0
      };
    }
    if (layout === 'side') {
      sideStyle = {
        background: inverted || dark ? theme.black : theme.white,
        height: '100%'
      };
    }
    if (themeDark) {
      headerStyle = {
        ...headerStyle,
        background: theme.colors.dark[7]
      };
      sideStyle = {
        ...sideStyle,
        background: theme.colors.dark[9]
      };
    }
    return {
      wrapper: {
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        width: '44px',
        height: '36px',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: themeDark ? theme.shadows.darkLayout : theme.shadows.layout
      },
      header: {
        position: 'absolute',
        top: 0,
        height: '25%',
        width: '100%',
        ...headerStyle
      },
      side: {
        position: 'absolute',
        width: '30%',
        height: '100%',
        ...sideStyle
      },
      content: {
        position: 'absolute',
        bottom: '-3px',
        right: '-3px'
      }
    };
  }
);

const CheckboxLayout: FC<IProps> = ({
  layout = 'side',
  checked,
  title,
  dark = false,
  inverted = false,
  onClick = () => {}
}) => {
  const { classes } = useStyles({ layout, dark, inverted });

  const boxSx = (theme: MantineTheme) => ({
    backgroundColor:
      theme.colorScheme !== 'dark' && !dark
        ? theme.colors.gray[2]
        : theme.colors.dark[5],
    cursor: 'pointer'
  });

  return (
    <Tooltip label={title}>
      <Box
        sx={boxSx}
        className={classes.wrapper}
        onClick={() => onClick(layout)}
      >
        <div className={classes.header} />
        {layout !== 'top' ? <div className={classes.side} /> : null}
        {checked ? (
          <div className={classes.content}>
            <ActionIcon variant="transparent" color="dark">
              <IconCheck size="1.125rem" />
            </ActionIcon>
          </div>
        ) : null}
      </Box>
    </Tooltip>
  );
};

export default CheckboxLayout;
