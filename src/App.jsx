import { Route, Routes } from 'react-router';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Suspense } from 'react';
import LoadingSpinner from './common/LoadingSpinner/LoadingSpinner';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Homepage />
            </Suspense>
          }
        />
        <Route path='movies'>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MoviesPage />
              </Suspense>
            }
          />
          <Route
            path=':id'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MovieDetailPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
