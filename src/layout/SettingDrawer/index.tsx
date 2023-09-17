import { FC } from 'react';
import { createPortal } from 'react-dom';
import { createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ThemeIcon, Drawer, Group } from '@mantine/core';
import { IconSettings, IconX } from '@tabler/icons-react';
import Container from './container.tsx';
import CheckboxLayout from './checkboxLayout.tsx';
import CheckboxColor from './checkboxColor.tsx';
import { ILayoutType } from '@/config/layoutTheme.ts';

interface IProps {
  floatTop?: number | string;
  drawerWidth?: number | string;
  layout?: 'mix' | 'side' | 'top';
  layoutStyle?: 'light' | 'dark' | 'inverted';
  primaryColor?: string;
  layoutList: ILayoutType[];
  layoutStyleList: ILayoutType[];
  colorList: { [key: string]: string[] };
  onToggleLayout?: (layout: string) => void;
  onToggleLayoutStyle?: (layoutStyle: string) => void;
  onSelectColor?: (color: string) => void;
}

export type TUseStyles = {
  floatTop: number | string;
  drawerWidth: number | string;
};

const useStyles = createStyles((_, { floatTop, drawerWidth }: TUseStyles) => {
  return {
    wrapper: {
      position: 'fixed',
      right: 0,
      top: `${floatTop}px`
    },
    drawerWrapper: {
      position: 'absolute',
      right: `${drawerWidth}px`,
      top: `${floatTop}px`,
      zIndex: 1001
    },
    drawerContent: {
      overflowY: 'unset'
    }
  };
});

const Index: FC<IProps> = ({
  floatTop = 240,
  drawerWidth = 300,
  layout,
  layoutStyle,
  primaryColor,
  layoutList,
  layoutStyleList,
  colorList,
  onToggleLayout = () => {},
  onToggleLayoutStyle = () => {},
  onSelectColor = () => {}
}) => {
  const { classes } = useStyles({ floatTop, drawerWidth });
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {createPortal(
        <div className={classes.wrapper}>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="filled"
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              cursor: 'pointer'
            }}
            onClick={open}
          >
            <IconSettings size="1.5rem" />
          </ThemeIcon>
        </div>,
        document.querySelector('#root') as Element
      )}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size={drawerWidth}
        overlayProps={{ opacity: 0.5, blur: 4 }}
        withCloseButton={false}
        classNames={{ content: classes.drawerContent }}
        transitionProps={{ duration: 150, timingFunction: 'linear' }}
        sx={{
          position: 'relative',
          overflowY: 'unset'
        }}
      >
        <Container title="整体风格设置">
          <Group spacing="xs">
            {layoutStyleList.map((item) => (
              <CheckboxLayout
                key={item.id}
                layout={item.key}
                title={item.title}
                dark={item.dark}
                inverted={item.inverted}
                checked={item.id === layoutStyle}
                onClick={() => onToggleLayoutStyle(item.id as string)}
              />
            ))}
          </Group>
        </Container>
        <Container title="导航模式">
          <Group spacing="xs">
            {layoutList.map((item) => (
              <CheckboxLayout
                key={item.key}
                layout={item.key}
                title={item.title}
                checked={item.key === layout}
                onClick={(layout) => onToggleLayout(layout)}
              />
            ))}
          </Group>
        </Container>
        <Container title="主题色">
          <Group spacing="xs">
            {Object.keys(colorList).map((item) => (
              <CheckboxColor
                key={item}
                color={item}
                colorList={colorList[item]}
                checked={item === primaryColor}
                onClick={(color) => onSelectColor(color)}
              />
            ))}
          </Group>
        </Container>
        <div className={classes.drawerWrapper}>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="filled"
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              cursor: 'pointer'
            }}
            onClick={close}
          >
            <IconX size="1.5rem" />
          </ThemeIcon>
        </div>
      </Drawer>
    </>
  );
};

export default Index;
