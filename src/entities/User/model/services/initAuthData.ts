import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<
  User, // return type
  void, // func argument type
  ThunkConfig<string>
>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const {
      rejectWithValue, dispatch,
    } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const userData = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      return userData;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
