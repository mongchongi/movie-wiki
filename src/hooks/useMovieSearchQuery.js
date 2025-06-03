import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieSearch = (keyword, sortBy, genreId, page) => {
  const params = new URLSearchParams();

  params.append('page', page);

  const isDefault = sortBy === 'Sort by' && !genreId && (!keyword || keyword.trim() === '');

  if (isDefault) {
    return api.get(`/movie/popular?${params.toString()}`);
  }

  if (sortBy !== 'Sort by') {
    params.append('sort_by', sortBy);
  }

  if (genreId) {
    params.append('with_genres', genreId);
  }

  if (keyword) {
    params.append('with_text_query', keyword);
  }

  return api.get(`/discover/movie?${params.toString()}`);
};

export const useMovieSearchQuery = (keyword, sortBy, genreId) => {
  return useInfiniteQuery({
    queryKey: ['movie-search', keyword, sortBy, genreId],
    queryFn: ({ pageParam }) => fetchMovieSearch(keyword, sortBy, genreId, pageParam),
    getNextPageParam: ({ data }) => {
      if (data.page < Math.min(data.total_pages, 500)) {
        return data.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
