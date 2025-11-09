import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovies = (type) => {
  return api.get(`/movie/${type}`);
};

export const useMoviesQuery = (type) => {
  return useQuery({
    queryKey: ['movies', type],
    queryFn: () => getMovies(type),
    select: (result) => result.data,
    suspense: true,
  });
};
