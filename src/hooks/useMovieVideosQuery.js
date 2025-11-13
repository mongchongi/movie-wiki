import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getMovieVideos = (movieId) => {
  return api.get(`/movie/${movieId}/videos`);
};

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-videos', movieId],
    queryFn: () => getMovieVideos(movieId),
    select: (result) => result.data,
    suspense: true,
  });
};
