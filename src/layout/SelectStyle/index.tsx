import { Switch, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import { toggleLayoutStyle } from '@/redux/reducers/app.ts';

const SelectStyle = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { layout } = useAppSelector((state) => state.app);

  const onChange = (event: any) => {
    dispatch(toggleLayoutStyle(event.currentTarget.checked ? 'dark' : 'light'));
  };

  return (
    <Switch
      size="md"
      color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
      onLabel={
        <IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />
      }
      offLabel={
        <IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />
      }
      checked={layout.layoutStyle === 'dark'}
      onChange={onChange}
    />
  );
};

export default SelectStyle;
