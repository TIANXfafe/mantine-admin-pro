import SideLayout from '@/layout/SideLayout';
import MixLayout from '@/layout/MixLayout';
import TopLayout from '@/layout/TopLayout';
import SettingDrawer from '@/layout/SettingDrawer';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/useAppStore.ts';
import {
  toggleLayout,
  toggleLayoutStyle,
  toggleThemeColor
} from '@/redux/reducers/app.ts';

const BaseLayout = () => {
  const dispatch = useAppDispatch();
  const { layout, layoutList, layoutStyleList, colorList } = useAppSelector(
    (state) => state.app
  );
  const styleList =
    layout.layout === 'mix'
      ? layoutStyleList.filter((item) => item.id !== 'inverted')
      : layoutStyleList;

  const renderLayout = () => {
    if (layout.layout === 'mix') {
      return <MixLayout />;
    } else if (layout.layout === 'side') {
      return <SideLayout inverted={layout.layoutStyle === 'inverted'} />;
    } else if (layout.layout === 'top') {
      return <TopLayout inverted={layout.layoutStyle === 'inverted'} />;
    }
  };

  return (
    <>
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
    </>
  );
};

export default BaseLayout;
