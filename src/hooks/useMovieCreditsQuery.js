import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieCredits = (movieId) => {
  return api.get(`/movie/${movieId}/credits`);
};

export const useMovieCreditsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-credits', movieId],
    queryFn: () => getMovieCredits(movieId),
    select: (result) => result.data,
  });
};
