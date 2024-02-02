import { Context, createContext, useEffect } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import {
  toggleCollapsed,
  toggleLayout,
  toggleLayoutStyle,
  toggleThemeColor
} from '@/redux/reducers/app.ts';
import MixLayout from '@/layout/MixLayout';
import SideLayout from '@/layout/SideLayout';
import TopLayout from '@/layout/TopLayout';
import MobileLayout from '@/layout/MobileLayout';
import SettingDrawer from '@/layout/SettingDrawer';
import RightContent from './RightContent';
import { useQueryBreakpoints } from '@/utils/hooks/useQueryBreakpoint.tsx';
import SideMenu from '@/layout/SideMenu';

export const LayoutContext: Context<{
  layout?: 'mix' | 'side' | 'top';
  sideWidth?: number;
  sideCollapsedWidth?: number;
  headerHeight?: number;
  invertedBg?: string;
  collapsed?: boolean;
  logo?: string;
  title?: string;
  isMobile?: boolean;
}> = createContext({});

const BaseLayout = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { isDesktop, isPad, isMobile } = useQueryBreakpoints();
  const { layout, layoutList, layoutStyleList, colorList, collapsed } =
    useAppSelector((state) => state.app);
  const styleList =
    layout.layout === 'mix'
      ? layoutStyleList.filter((item) => item.id !== 'inverted')
      : layoutStyleList;

  const renderLayout = () => {
    if (isMobile) {
      return <MobileLayout />;
    } else {
      if (layout.layout === 'mix') {
        return (
          <MixLayout headerRight={<RightContent />} sideMenu={<SideMenu />} />
        );
      } else if (layout.layout === 'side') {
        return (
          <SideLayout headerRight={<RightContent />} sideMenu={<SideMenu />} />
        );
      } else if (layout.layout === 'top') {
        return <TopLayout headerRight={<RightContent />} />;
      }
    }
  };

  useEffect(() => {
    if (isPad) {
      dispatch(toggleCollapsed(true));
    } else if (isDesktop) {
      dispatch(toggleCollapsed(false));
    }
    if (isMobile) {
      dispatch(toggleCollapsed(false));
    }
  }, [isDesktop, isPad, isMobile]);

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
        title: layout.title,
        isMobile
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
