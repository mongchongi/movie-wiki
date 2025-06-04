import styles from './App.module.css';
import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Suspense } from 'react';
import Loading from './common/components/Loading/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './common/components/ErrorFallback/ErrorFallback';

const App = () => (
  <div className={styles['container']}>
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path='movies'>
          <Route index element={<MoviesPage />} />
          <Route
            path=':id'
            element={
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loading />}>
                  <MovieDetailPage />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;
