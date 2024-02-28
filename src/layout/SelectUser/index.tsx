import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore';
import { Menu, Flex, Avatar, Text } from '@mantine/core';
import { IconUser, IconSettings, IconDoorExit } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { logout } from '@/redux/reducers/user.ts';
import { useLocation, useNavigate } from 'react-router-dom';

const userOptions = [
  {
    label: 'global.layout.header.right.user.center',
    key: 'userCenter',
    icon: <IconUser size={14} />
  },
  {
    label: 'global.layout.header.right.user.setting',
    key: 'setting',
    icon: <IconSettings size={14} />
  },
  {
    key: 'divider',
    type: 'divider'
  },
  {
    label: 'global.layout.header.right.logout',
    icon: <IconDoorExit size={14} />,
    key: 'logout'
  }
];

const SelectUser = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);

  const onClick = (key: string) => {
    if (key === 'logout') {
      dispatch(logout());
      navigate('/login', {
        replace: true,
        state: { redirect: location.pathname }
      });
    }
  };

  return (
    <Menu
      position="bottom-end"
      offset={10}
      withArrow
      arrowPosition="center"
      trigger="click"
      transitionProps={{ transition: 'scale', duration: 150 }}
    >
      <Menu.Target>
        <Flex gap="xs" align="center" style={{ cursor: 'pointer' }}>
          <Avatar
            variant="outline"
            radius="xl"
            size="sm"
            src={userInfo?.avatar}
          />
          <Text fz="sm" fw={700}>
            {userInfo?.nickname || userInfo?.account}
          </Text>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        {userOptions.map((item) => {
          if (item.type === 'divider') return <Menu.Divider key={item.key} />;
          return (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => onClick(item.key)}
            >
              {t(item.label!)}
            </Menu.Item>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SelectUser;
