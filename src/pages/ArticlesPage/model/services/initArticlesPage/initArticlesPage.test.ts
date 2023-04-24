// import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
// import { initArticlesPage } from './initArticlesPage';
//
// const data = {
//   page: 2,
//   ids: [],
//   entities: {},
//   limit: 5,
//   isLoading: false,
//   hasMore: true,
//   _inited: false,
// };
//
// jest.mock('../fetchArticlesList/fetchArticlesList');
//
// describe('initArticlesPage.test', () => {
//   test('inited is false', async () => {
//     const thunk = new TestAsyncThunk(initArticlesPage, {
//       articlesPage: {
//         ...data,
//         _inited: false,
//       },
//     });
//
//     await thunk.callThunk();
//
//     // expect(thunk.dispatch).toBeCalledTimes(2);
//     expect(fetchArticlesList).toBeCalled();
//   });
//
//   test('inited is true', async () => {
//     const thunk = new TestAsyncThunk(initArticlesPage, {
//       articlesPage: {
//         ...data,
//         _inited: true,
//       },
//     });
//
//     await thunk.callThunk();
//
//     expect(fetchArticlesList).not.toBeCalled();
//   });
// });
