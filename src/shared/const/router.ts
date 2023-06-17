export enum AppRoutes {
  MAIN = 'main',
  SETTINGS = 'settings',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  // last
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticle = (id: string) => `/articles/${id}`;
export const getRouteArticlesCreate = () => '/articles/new';
export const getRouteArticlesEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
// last
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotfound = () => '*';

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: getRouteMain(),
  [AppRoutes.SETTINGS]: getRouteSettings(),
  [AppRoutes.ABOUT]: getRouteAbout(),
  [AppRoutes.PROFILE]: getRouteProfile(':id'),
  [AppRoutes.ARTICLES]: getRouteArticles(),
  [AppRoutes.ARTICLE_DETAILS]: getRouteArticle(':id'),
  [AppRoutes.ARTICLE_CREATE]: getRouteArticlesCreate(),
  [AppRoutes.ARTICLE_EDIT]: getRouteArticlesEdit(':id'),
  [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
  // last
  [AppRoutes.FORBIDDEN]: getRouteForbidden(),
  [AppRoutes.NOT_FOUND]: getRouteNotfound(),
};
