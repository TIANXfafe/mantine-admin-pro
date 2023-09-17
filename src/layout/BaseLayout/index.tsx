import { Context, createContext } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import {
  toggleLayout,
  toggleLayoutStyle,
  toggleThemeColor
} from '@/redux/reducers/app.ts';
import MixLayout from '@/layout/MixLayout';
import SideLayout from '@/layout/SideLayout';
import TopLayout from '@/layout/TopLayout';
import SettingDrawer from '@/layout/SettingDrawer';

export const LayoutContext: Context<{
  layout?: 'mix' | 'side' | 'top';
  sideWidth?: number;
  sideCollapsedWidth?: number;
  headerHeight?: number;
  invertedBg?: string;
  collapsed?: boolean;
  logo?: string;
  title?: string;
}> = createContext({});

const BaseLayout = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { layout, layoutList, layoutStyleList, colorList, collapsed } =
    useAppSelector((state) => state.app);
  const styleList =
    layout.layout === 'mix'
      ? layoutStyleList.filter((item) => item.id !== 'inverted')
      : layoutStyleList;

  const renderLayout = () => {
    if (layout.layout === 'mix') {
      return <MixLayout />;
    } else if (layout.layout === 'side') {
      return <SideLayout />;
    } else if (layout.layout === 'top') {
      return <TopLayout />;
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        layout: layout.layout,
        sideWidth: layout.sideWidth,
        sideCollapsedWidth: layout.sideCollapsedWidth,
        headerHeight: layout.headerHeight,
        invertedBg:
          layout.layoutStyle === 'inverted' ? theme.colors.dark[9] : '',
        collapsed,
        logo: layout.logo,
        title: layout.title
      }}
    >
      {renderLayout()}
      <SettingDrawer
        layout={layout.layout}
        layoutStyle={layout.layoutStyle}
        primaryColor={layout.primaryColor}
        layoutList={layoutList}
        layoutStyleList={styleList}
        colorList={colorList}
        onToggleLayout={(layout) => dispatch(toggleLayout(layout))}
        onToggleLayoutStyle={(layoutStyle) =>
          dispatch(toggleLayoutStyle(layoutStyle))
        }
        onSelectColor={(color) => dispatch(toggleThemeColor(color))}
      />
    </LayoutContext.Provider>
  );
};

export default BaseLayout;
