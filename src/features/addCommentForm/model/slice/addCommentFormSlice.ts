import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCommentForArticle } from 'pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { AddCommentFormSchema, AddCommentFormStatus } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
  text: '',
  status: AddCommentFormStatus.IDLE,
};

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCommentForArticle.pending, (state) => {
        state.status = AddCommentFormStatus.SENDING;
      })
      .addCase(addCommentForArticle.fulfilled, (state) => {
        state.status = AddCommentFormStatus.IDLE;
      })
      .addCase(addCommentForArticle.rejected, (state) => {
        state.status = AddCommentFormStatus.IDLE;
      });
  },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
