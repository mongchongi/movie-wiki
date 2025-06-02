import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovies = () => {
  return api.get('/movie/popular');
};

export const useMoviesQuery = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    select: (result) => result.data,
  });
};
