import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieSearch = (keyword) => {
  if (!keyword) {
    return api.get('/movie/popular');
  }

  return api.get(`/search/movie?query=${keyword}`);
};

export const useMovieSearchQuery = (keyword) => {
  return useQuery({
    queryKey: ['movie-search', keyword],
    queryFn: () => fetchMovieSearch(keyword),
    select: (result) => result.data,
  });
};
