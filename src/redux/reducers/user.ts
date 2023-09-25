import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ILoginParams, loginApi } from '@/services/apis/user.ts';
import toast from 'react-hot-toast';
import { notifications } from '@mantine/notifications';
import { notificationStyle } from '@/services';

export interface IUserState {
  userInfo: null | { [key: string]: any };
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

export const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload;
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

export const { setToken } = useSlice.actions;

export default useSlice.reducer;
