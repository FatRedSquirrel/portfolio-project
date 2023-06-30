import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { AppRoutesProps } from '@/shared/types/router';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';
import RequireAuth from './RequireAuth';
import { ToggleFeatures } from '@/shared/features';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={(
        <ToggleFeatures
          feature='isAppRedesigned'
          on={<PageLoader />}
          off={(
            <PageLoader />
          )}
        />
      )}
      >
        {route.element}
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly
          ? (
            <RequireAuth roles={route.roles}>
              {element}
            </RequireAuth>
          )
          : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
