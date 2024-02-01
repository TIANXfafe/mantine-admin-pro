import logo from '@/assets/react.svg';

export interface ILayoutType {
  id?: string;
  key: 'mix' | 'side' | 'top';
  title: string;
  inverted?: boolean;
  dark?: boolean;
}

export interface ILayoutTheme {
  // 标题
  title?: string;
  // 菜单布局
  layout: 'mix' | 'side' | 'top';
  // 菜单风格
  layoutStyle: 'light' | 'dark' | 'inverted';
  // 主题色
  primaryColor: string;
  // 头部高度
  headerHeight: number;
  // 侧边栏宽度
  sideWidth: number;
  // 侧边栏收缩宽度
  sideCollapsedWidth: number;
  // 图标
  logo: string;
}

export interface IlocaleType {
  label: string;
  key: string;
  icon: string;
}

export const layoutTheme: ILayoutTheme = {
  title: 'Mantine Admin Pro',
  layout: 'mix',
  layoutStyle: 'light',
  primaryColor: 'blue',
  headerHeight: 48,
  sideWidth: 240,
  sideCollapsedWidth: 48,
  logo
  // showSideTrigger: 'arrow-circle',
  // collapsed: false,
  // theme: 'default',
};
