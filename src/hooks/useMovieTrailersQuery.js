import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieTrailers = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieTrailersQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-video', movieId],
    queryFn: () => fetchMovieTrailers(movieId),
    select: (result) => result.data,
    suspense: true,
  });
};
