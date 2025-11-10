import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getSearchedMovies = (page, keyword) => {
  return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`) : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = (keyword) => {
  return useInfiniteQuery({
    queryKey: ['movie-search', keyword],
    queryFn: ({ pageParam }) => getSearchedMovies(pageParam, keyword),
    getNextPageParam: (last) => {
      if (last.data.page < 500) {
        return last.data.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    select: (data) => {
      const allResults = data.pages.flatMap((page) => page.data.results);
      const uniqueResults = allResults.filter(
        (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
      );

      return {
        pages: data.pages,
        movies: uniqueResults,
      };
    },
    suspense: true,
  });
};
