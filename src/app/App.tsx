import {
  Suspense, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeatures } from '@/shared/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';
import { useAppToolbar } from './lib/useAppToolbar';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const inited = useSelector(getUserInited);

  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!inited) {
      dispatch(initAuthData());
    }
  }, [dispatch, inited]);

  if (!inited) {
    return (
      <ToggleFeatures
        feature='isAppRedesigned'
        on={(
          <div
            id='app'
            className={classNames('app_redesigned', theme)}
          >
            <AppLoaderLayout />
          </div>
        )}
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <div
          id='app'
          className={classNames('app_redesigned', theme)}
        >
          <Suspense fallback="">
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      )}
      off={(
        <div
          id='app'
          className={classNames('app', theme)}
        >
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      )}
    />
  );
}

export default App;
