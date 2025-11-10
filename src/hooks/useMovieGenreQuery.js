import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieGenre = () => {
  return api.get('/genre/movie/list');
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genre'],
    queryFn: getMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 1000 * 60 * 5,
    suspense: true,
  });
};
