import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieSearch = (keyword, page) => {
  console.log('🚀 ~ fetchMovieSearch ~ page:', page);
  if (!keyword) {
    return api.get(`/movie/popular?page=${page}`);
  }

  return api.get(`/search/movie?query=${keyword}&page=${page}`);
};

export const useMovieSearchQuery = (keyword) => {
  return useInfiniteQuery({
    queryKey: ['movie-search', keyword],
    queryFn: ({ pageParam }) => fetchMovieSearch(keyword, pageParam),
    getNextPageParam: ({ data }) => {
      if (data.page < Math.min(data.total_pages, 500)) {
        return data.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
