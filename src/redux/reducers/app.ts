import { createSlice } from '@reduxjs/toolkit';
import {
  ILayoutTheme,
  ILayoutType,
  layoutTheme
} from '@/config/layoutTheme.ts';

interface IInitialState {
  layout: ILayoutTheme;
  colorList: { [key: string]: string[] };
  layoutList: ILayoutType[];
  layoutStyleList: ILayoutType[];
  collapsed: boolean;
}

const layoutList: ILayoutType[] = [
  {
    key: 'mix',
    title: '混合菜单布局'
  },
  {
    key: 'side',
    title: '侧边菜单布局'
  },
  {
    key: 'top',
    title: '顶部菜单布局'
  }
];
const layoutStyleList: ILayoutType[] = [
  {
    id: 'light',
    key: 'side',
    title: '亮色模式'
  },
  {
    id: 'inverted',
    key: 'side',
    inverted: true,
    title: '反转色模式'
  },
  {
    id: 'dark',
    key: 'side',
    title: '暗色模式',
    dark: true
  }
];

const initialState: IInitialState = {
  layout: layoutTheme,
  colorList: {},
  layoutList,
  layoutStyleList,
  collapsed: false
};

export const layoutSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 切换菜单布局
    toggleLayout: (state, action) => {
      if (action.payload === 'mix' && state.layout.layoutStyle === 'inverted') {
        state.layout.layoutStyle = 'light';
      } else {
        state.layout.layout = action.payload;
      }
      localStorage.setItem('layout', action.payload);
    },
    // 切换风格
    toggleLayoutStyle: (state, action) => {
      state.layout.layoutStyle = action.payload;
      localStorage.setItem('layoutStyle', action.payload);
    },
    // 设置主题色列表
    setThemeColor: (state, action) => {
      state.colorList = action.payload;
    },
    // 切换主题色
    toggleThemeColor: (state, action) => {
      state.layout.primaryColor = action.payload;
    },
    // 切换侧边栏收缩
    toggleCollapsed: (state, action) => {
      state.collapsed = action.payload;
    }
  }
});

export const {
  toggleLayout,
  toggleLayoutStyle,
  setThemeColor,
  toggleThemeColor,
  toggleCollapsed
} = layoutSlice.actions;

export default layoutSlice.reducer;
