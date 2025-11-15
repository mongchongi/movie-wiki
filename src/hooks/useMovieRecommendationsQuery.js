import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieRecommendations = (movieId) => {
  return api(`/movie/${movieId}/recommendations`);
};

export const useMovieRecommendationsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-recommendations', movieId],
    queryFn: () => getMovieRecommendations(movieId),
    select: (result) => result.data,
  });
};
