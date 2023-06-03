import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { RoutePath, getRouteProfile } from '@/shared/const/router';
// deprecated sidebar icons
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
// redesigned sidebar icons
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';

import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/features';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData): SidebarItemType[] => {
    const items: SidebarItemType[] = [
      {
        path: RoutePath.main,
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => MainIconDeprecated,
          on: () => MainIcon,
        }),
        text: 'Главная',
      },
      {
        path: RoutePath.about,
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => AboutIconDeprecated,
          on: () => AboutIcon,
        }),
        text: 'О сайте',
      },
    ];

    if (userData) {
      items.push(
        {
          path: getRouteProfile(userData?.id),
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            off: () => ProfileIconDeprecated,
            on: () => ProfileIcon,
          }),
          text: 'Профиль',
          authOnly: true,
        },
        {
          path: RoutePath.articles,
          Icon: toggleFeatures({
            name: 'isAppRedesigned',
            off: () => ArticleIconDeprecated,
            on: () => ArticleIcon,
          }),
          text: 'Статьи',
          authOnly: true,
        },
      );
    }

    return items;
  },
);
