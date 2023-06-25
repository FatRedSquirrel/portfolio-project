import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { fetchProfileData } from '@/entities/Profile';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';

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

      dispatch(fetchProfileData(userData.id));

      localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, userData.features?.isAppRedesigned ? 'new' : 'old');

      return userData;
    } catch (e) {
      console.log(e);
      return rejectWithValue('error');
    }
  },
);
