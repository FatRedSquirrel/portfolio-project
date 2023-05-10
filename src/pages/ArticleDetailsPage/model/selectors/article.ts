import { createSelector } from '@reduxjs/toolkit';
import { getArticlesDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = createSelector(
  getArticlesDetailsData,
  getUserAuthData,
  (article, userAuthData) => {
    if (!article || !userAuthData) {
      return false;
    }

    return article.user.id === userAuthData.id;
  },
);
