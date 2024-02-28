import { FC, useState, createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  createStyles,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
  Menu
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import * as IconList from '@tabler/icons-react';
import type { MantineTheme } from '@mantine/core';
import type { TMenuItem } from '@/config/menu.ts';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { addTab } from '@/redux/reducers/menu.ts';

const useStyles = createStyles(
  (theme: MantineTheme, { collapsed }: { collapsed: boolean }) => {
    const { xs, md, xl } = theme.spacing;
    const isDark = theme.colorScheme === 'dark';
    const hover = {
      backgroundColor: isDark ? theme.colors.dark[7] : theme.colors.gray[0],
      color: isDark ? theme.colors.dark[0] : theme.black
    };
    return {
      link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: collapsed ? 0 : `${xs} ${md}`,
        marginLeft: collapsed ? 0 : xl,
        fontSize: theme.fontSizes.sm,
        color: `${isDark ? theme.colors.dark[0] : theme.colors.gray[7]}`,
        borderLeft: collapsed
          ? '0'
          : `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        cursor: 'pointer',

        '&:hover': collapsed ? null : hover
      },
      control: {
        fontWeight: 500,
        width: '100%',
        padding: collapsed ? xs : `${xs} ${md}`,
        fontSize: theme.fontSizes.sm,

        '&:hover': hover
      },
      chevron: { transition: 'transform 200ms ease;' }
    };
  }
);

const LinksGroup: FC<TMenuItem> = ({
  label,
  icon,
  link,
  initiallyOpened = false,
  children
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasChild = Array.isArray(children);
  const { collapsed } = useAppSelector((state) => state.app);
  const { classes } = useStyles({ collapsed });

  const [opened, setOpened] = useState(initiallyOpened || false);

  const handleNavigate = () => {
    if (hasChild) {
      if (!collapsed) setOpened((o) => !o);
      else return;
    } else {
      dispatch(addTab({ key: label, value: link }));
      navigate(link || '/');
    }
  };

  const items = (hasChild ? children : []).map((link) => (
    <Text
      className={classes.link}
      key={link.label}
      onClick={() => {
        dispatch(addTab({ key: link.link, value: link.label }));
        navigate(link.link!);
      }}
    >
      {link.label}
    </Text>
  ));

  if (collapsed) {
    return children ? (
      <Menu
        trigger="hover"
        position="right"
        withArrow
        transitionProps={{ transition: 'scale', duration: 150 }}
      >
        <Menu.Target>
          <UnstyledButton onClick={handleNavigate} className={classes.control}>
            <Group spacing={0}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={26}>
                  {icon &&
                    createElement((IconList as any)[icon], { size: rem(12) })}
                </ThemeIcon>
              </Box>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          {items.map((item, index) => (
            <Menu.Item key={index}>{item}</Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    ) : (
      <UnstyledButton onClick={handleNavigate} className={classes.control}>
        <Group spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={26}>
              {icon &&
                createElement((IconList as any)[icon], { size: rem(12) })}
            </ThemeIcon>
          </Box>
        </Group>
      </UnstyledButton>
    );
  } else {
    return (
      <>
        <UnstyledButton onClick={handleNavigate} className={classes.control}>
          <Group spacing={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                {icon &&
                  createElement((IconList as any)[icon], { size: rem(18) })}
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasChild && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none'
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasChild ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
    );
  }
};

export default LinksGroup;
