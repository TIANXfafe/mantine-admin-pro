import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserInfoApi,
  ILoginParams,
  loginApi
} from '@/services/apis/user.ts';
import toast from 'react-hot-toast';
import { notifications } from '@mantine/notifications';
import { notificationStyle } from '@/services';

export interface IUserInfo {
  id: string;
  account: string;
  mobile: string | number;
  password: string;
  nickname: string;
  gender: 0 | 1 | '0' | '1' | null | ''; // 0 男  1 女
  address: string;
  avatar: string;
  role: string; // user 普通用户  admin 管理员
  status: 0 | 1 | 2 | '0' | '1' | '2' | null | ''; // 0 未激活  1 激活  2 封禁
  createdAt: string | number;
  updatedAt: string | number;
}

export interface IUserState {
  userInfo: null | IUserInfo;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  userInfo: null,
  accessToken: null,
  loading: false,
  error: null
};

export const userLoginAsync = createAsyncThunk(
  'user/loginAsync',
  async (formData: ILoginParams, thunkAPI) => {
    try {
      const res: any = await loginApi(formData);
      if (res.code === 0) {
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data;
      } else {
        return thunkAPI.rejectWithValue({ error: res.msg });
      }
    } catch (err) {
      // console.log('err', err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const getUserInfoAsync = createAsyncThunk(
  'user/getUserInfoAsync',
  async (_, thunkAPI) => {
    try {
      const res = await getUserInfoApi();
      if (res.code === 0) {
        thunkAPI.dispatch(setUserInfo(res.data));
      } else {
        return thunkAPI.rejectWithValue({ error: res.msg });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: () => {
      setToken(null);
      setUserInfo(null);
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLoginAsync.pending, (state) => {
      // console.log('pending');
      state.loading = true;
    });
    builder.addCase(userLoginAsync.fulfilled, (state, { payload }) => {
      // console.log('fulfilled');
      state.loading = false;
      state.accessToken = payload.accessToken;
      toast.success('登录成功');
    });
    builder.addCase(userLoginAsync.rejected, (state, { payload }) => {
      // console.log('rejected');
      state.loading = false;
      notifications.show({
        title: '登录失败',
        message: payload.error,
        styles: notificationStyle
      });
    });
  }
});

export const { setToken, setUserInfo, logout } = useSlice.actions;

export default useSlice.reducer;
