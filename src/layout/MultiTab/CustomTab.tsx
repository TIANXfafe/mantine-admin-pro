import {
  Center,
  createStyles,
  Flex,
  MantineTheme,
  Menu,
  rem,
  Text,
  UnstyledButton
} from '@mantine/core';
import { IconX, IconDots, IconReload } from '@tabler/icons-react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import {
  clearTab,
  deleteGroupTab,
  deleteTab,
  switchTab,
  TMenuType
} from '@/redux/reducers/menu.ts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DefaultRoute } from '@/router/guardRoutes';
import { useTranslation } from 'react-i18next';

const useStyles = createStyles((theme: MantineTheme) => {
  const isDark = theme.colorScheme === 'dark';
  return {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
      paddingRight: rem(50),
      borderBottom: `${rem(1)} solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`
    },
    content: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      gap: rem(2),

      '&::-webkit-scrollbar': {
        width: 0,
        height: 0
      }
    },
    item: {
      padding: `${rem(5)} ${rem(10)}`,
      minWidth: rem(80),
      cursor: 'pointer',
      border: `${rem(1)} solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
      borderBottom: '0',
      transition: 'background .4s',
      flexShrink: 0
    },
    isActive: {
      background: isDark ? theme.colors.dark[6] : theme.white
    },
    title: {
      maxWidth: rem(120)
    },
    menu: {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translate3d(-50%, -40%, 0)'
    }
  };
});

const CustomTab = () => {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { menuTabs, curTab } = useAppSelector((state) => state.menu);

  const onRefresh = () => {
    navigate(curTab!.key.toString());
  };

  const onClose = (event: any, obj: TMenuType) => {
    event.stopPropagation();
    if (menuTabs.length === 1) {
      toast.error(t('global.layout.multi-tab.warning'));
      return;
    }
    dispatch(deleteTab(obj.key));
    const index = menuTabs.findIndex((item) => item.key === curTab!.key);
    navigate(
      index === 0 ? menuTabs[1].key.toString() : menuTabs[0].key.toString()
    );
  };

  const onGroupClose = (type: 'cur' | 'all' | 'other') => {
    if (type === 'cur') {
      if (menuTabs.length === 1) {
        toast.error(t('global.layout.multi-tab.warning'));
        return;
      }
      dispatch(deleteTab(curTab!.key));
      const index = menuTabs.findIndex((item) => item.key === curTab!.key);
      navigate(
        index === 0 ? menuTabs[1].key.toString() : menuTabs[0].key.toString()
      );
    } else if (type === 'all') {
      dispatch(clearTab());
      navigate(DefaultRoute);
    } else if (type === 'other') {
      dispatch(
        deleteGroupTab(
          menuTabs
            .filter((item) => item.key !== curTab!.key)
            .map((item) => item.key)
        )
      );
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {Boolean(menuTabs.length) &&
          menuTabs.map((item) => (
            <Flex
              align="center"
              justify="space-between"
              gap={rem(10)}
              fz={rem(14)}
              wrap="nowrap"
              key={item.key}
              className={cn(classes.item, {
                [classes.isActive]: curTab!.key === item.key
              })}
              onClick={() => {
                dispatch(switchTab(item));
                navigate(item.key.toString());
              }}
            >
              <Text className={classes.title} lineClamp={1}>
                {item.value}
              </Text>
              {curTab!.key === item.key && (
                <UnstyledButton onClick={onRefresh}>
                  <Center>
                    <IconReload style={{ width: rem(12), height: rem(12) }} />
                  </Center>
                </UnstyledButton>
              )}
              <UnstyledButton onClick={(event) => onClose(event, item)}>
                <Center>
                  <IconX style={{ width: rem(12), height: rem(12) }} />
                </Center>
              </UnstyledButton>
            </Flex>
          ))}
      </div>
      <div className={classes.menu}>
        <Menu
          withArrow
          position="bottom-end"
          transitionProps={{ transition: 'scale', duration: 150 }}
        >
          <Menu.Target>
            <IconDots style={{ width: rem(18) }} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => onGroupClose('cur')}>
              {t('global.layout.multi-tab.close-current')}
            </Menu.Item>
            <Menu.Item onClick={() => onGroupClose('other')}>
              {t('global.layout.multi-tab.close-other')}
            </Menu.Item>
            <Menu.Item onClick={() => onGroupClose('all')}>
              {t('global.layout.multi-tab.close-all')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default CustomTab;
