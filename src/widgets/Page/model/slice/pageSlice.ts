import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageSchema } from 'widgets/Page';

const initialState: PageSchema = {
  scroll: {},
};

const pageSlice = createSlice({
  name: 'pageSlice',
  initialState,
  reducers: {
    setScrollPosition(state, { payload }: PayloadAction<{ path: string, position: number }>) {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: pageActions } = pageSlice;
export const { reducer: pageReducer } = pageSlice;
