import { Route, Routes } from 'react-router';
import AppLayout from './layout/AppLayout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => (
  <Routes>
    <Route path='/' element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/movies'>
        <Route index element={<MoviesPage />} />
        <Route path=':id' element={<MovieDetailPage />} />
      </Route>
    </Route>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

export default App;
