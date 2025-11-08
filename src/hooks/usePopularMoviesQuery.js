import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getPopularMovies = () => {
  return api.get('/movie/popular');
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['popular-movies'],
    queryFn: getPopularMovies,
    select: (result) => result.data,
  });
};
