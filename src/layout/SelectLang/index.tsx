import { useState } from 'react';
import { MantineTheme, Menu } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';
import { changeLanguage } from 'i18next';
import { useAppSelector } from '@/utils/hooks/useAppStore';

const SelectLang = () => {
  const [curLanguage, setCurLanguage] = useState(
    localStorage.getItem('i18nextLng') || 'zh'
  );

  const { localeOptions } = useAppSelector((state) => state.app);

  const onChange = (key: string) => {
    changeLanguage(key);
    setCurLanguage(key);
  };

  return (
    <Menu
      position="bottom-end"
      offset={15}
      withArrow
      arrowPosition="center"
      trigger="hover"
    >
      <Menu.Target>
        <IconLanguage width="1.2em" height="1.2em" />
      </Menu.Target>
      <Menu.Dropdown>
        {localeOptions.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => onChange(item.key)}
            sx={(theme: MantineTheme) => ({
              background:
                item.key === curLanguage
                  ? theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[2]
                  : 'transparent'
            })}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default SelectLang;
