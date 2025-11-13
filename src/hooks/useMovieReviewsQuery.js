import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieReviews = (movieId) => {
  return api.get(`/movie/${movieId}/reviews`);
};

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-reviews', movieId],
    queryFn: () => getMovieReviews(movieId),
    select: (result) => result.data,
    suspense: true,
  });
};
