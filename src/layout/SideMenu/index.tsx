import { ScrollArea } from '@mantine/core';
import MenuData from '@/config/menu.ts';
import LinksGroup from './LinksGroup.tsx';

const SideMenu = () => {
  return (
    <ScrollArea>
      <div>
        {MenuData.map((item) => (
          <LinksGroup key={item.label} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SideMenu;
