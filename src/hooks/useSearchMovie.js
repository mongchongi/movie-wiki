import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getSearchedMovies = (keyword) => {
  return keyword ? api.get(`/search/movie?query=${keyword}`) : api.get('/movie/popular');
};

export const useSearchMovieQuery = (keyword) => {
  return useQuery({
    queryKey: ['movie-search', keyword],
    queryFn: () => getSearchedMovies(keyword),
    select: (result) => result.data,
  });
};
