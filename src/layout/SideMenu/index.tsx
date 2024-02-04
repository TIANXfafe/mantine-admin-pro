import { ScrollArea } from '@mantine/core';
import LinksGroup from './LinksGroup.tsx';
import { useAppSelector } from '@/utils/hooks/useAppStore.ts';

const SideMenu = () => {
  const { menuList } = useAppSelector((state) => state.app);

  return (
    <ScrollArea sx={{ overflow: 'visible' }}>
      <div>
        {menuList.map((item) => (
          <LinksGroup key={item.label} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SideMenu;
