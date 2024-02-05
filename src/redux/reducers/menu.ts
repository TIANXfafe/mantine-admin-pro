import { ReactElement } from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MenuData, { TMenuItem } from '@/config/menu.ts';
import { getMenuData } from '@/services/apis/menu.ts';
import { findFirstObj } from '@/utils/methods/tree.ts';

export type TMenuType = {
  key: string | number;
  value: string | number | ReactElement;
};

interface IInitialState {
  menuList: TMenuItem[];
  menuTabs: TMenuType[];
  curTab: TMenuType | null;
}

const initialState: IInitialState = {
  menuList: MenuData,
  menuTabs: [],
  curTab: null
};

export const setMenuAsync = createAsyncThunk(
  'menu/setMenuAsync',
  async (_, thunkAPI) => {
    try {
      const res = await getMenuData();
      if (res.code === 0) {
        thunkAPI.dispatch(setMenu(res.data));
      } else {
        return thunkAPI.rejectWithValue({ error: res.msg });
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // 设置菜单
    setMenu: (state, action) => {
      state.menuList = action.payload;
    },
    // 添加tab
    addTab: (state, action) => {
      if (!state.menuTabs.some((item) => item.key === action.payload.key)) {
        state.menuTabs.push(action.payload);
      }
      state.curTab = action.payload;
    },
    // 删除tab
    deleteTab: (state, action) => {
      const index = state.menuTabs.findIndex(
        (item) => item.key === action.payload
      );
      state.curTab = index === 0 ? state.menuTabs[1] : state.menuTabs[0];
      state.menuTabs = state.menuTabs.filter(
        (item) => item.key !== action.payload
      );
    },
    // 批量删除tab
    deleteGroupTab: (state, action) => {
      state.menuTabs = state.menuTabs.filter(
        (item) => !action.payload.includes(item.key)
      );
    },
    // 切换tab
    switchTab: (state, action) => {
      state.curTab = action.payload;
    },
    // 清空tab
    clearTab: (state) => {
      const firstLink = findFirstObj(state.menuList, 'children', 'link');
      state.menuTabs = [{ key: firstLink!.link!, value: firstLink!.label }];
      state.curTab = { key: firstLink!.link!, value: firstLink!.label };
    }
  }
});

export const {
  setMenu,
  addTab,
  deleteTab,
  deleteGroupTab,
  switchTab,
  clearTab
} = menuSlice.actions;

export default menuSlice.reducer;
