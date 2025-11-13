import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieDetail = (movieId) => {
  return api.get(`/movie/${movieId}`);
};

export const useMovieDetailQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => getMovieDetail(movieId),
    select: (result) => result.data,
    suspense: true,
  });
};
