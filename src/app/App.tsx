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
import { PageLoader } from '@/shared/ui/deprecated/PageLoader';
import { ToggleFeatures } from '@/shared/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <PageLoader />;
  }

  return (
    <ToggleFeatures
      feature='isAppRedesigned'
      on={(
        <div className={classNames('app_redesigned', theme)}>
          <Suspense fallback="">
            <MainLayout
              content={<AppRouter />}
              header={<Navbar />}
              sidebar={<Sidebar />}
              toolbar={<div>toolbar</div>}
            />
          </Suspense>
        </div>
      )}
      off={(
        <div className={classNames('app', theme)}>
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
