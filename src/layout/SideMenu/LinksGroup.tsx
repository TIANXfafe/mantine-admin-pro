import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  createStyles,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import type { MantineTheme } from '@mantine/core';
import type { TMenuItem } from '@/config/menu.ts';
import { useAppSelector } from '@/utils/hooks/useAppStore.ts';

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
        padding: `${xs} ${md}`,
        marginLeft: xl,
        fontSize: theme.fontSizes.sm,
        color: `${isDark ? theme.colors.dark[0] : theme.colors.gray[7]}`,
        borderLeft: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        cursor: 'pointer',

        '&:hover': hover
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
  icon: Icon,
  link,
  initiallyOpened = false,
  children
}) => {
  const navigate = useNavigate();
  const hasChild = Array.isArray(children);
  const { collapsed } = useAppSelector((state) => state.app);
  const { classes } = useStyles({ collapsed });

  const [opened, setOpened] = useState(initiallyOpened || false);

  const handleNavigate = () => {
    if (hasChild) {
      if (!collapsed) setOpened((o) => !o);
      else return;
    } else {
      navigate(link || '/');
    }
  };

  const items = (hasChild ? children : []).map((link) => (
    <Text
      className={classes.link}
      key={link.label}
      onClick={() => navigate(link.link!)}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton onClick={handleNavigate} className={classes.control}>
        <Group spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={collapsed ? 26 : 30}>
              {Icon && <Icon sx={{ width: rem(18), height: rem(18) }} />}
            </ThemeIcon>
            {!collapsed && <Box ml="md">{label}</Box>}
          </Box>
          {hasChild && !collapsed && (
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
      {hasChild && !collapsed ? (
        <Collapse in={!collapsed ? opened : false}>{items}</Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
