import { useEffect, useState } from 'react';
import { ScrollArea } from '@mantine/core';
import staticMenu, { TMenuItem } from '@/config/menu.ts';
import { getMenuData } from '@/services/apis/menu.ts';
import LinksGroup from './LinksGroup.tsx';

const SideMenu = () => {
  const [menu, setMenu] = useState<TMenuItem[]>([]);
  const initData = async () => {
    const res = await getMenuData();
    if (res.code !== 0) setMenu(staticMenu);
    else setMenu(res.data!);
  };

  useEffect(() => {
    initData().then();
  }, []);

  return (
    <ScrollArea sx={{ overflow: 'visible' }}>
      <div>
        {menu.map((item) => (
          <LinksGroup key={item.label} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default SideMenu;
