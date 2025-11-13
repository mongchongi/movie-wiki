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
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path='movies'>
            <Route index element={<MoviesPage />} />
            <Route path=':id' element={<MovieDetailPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
