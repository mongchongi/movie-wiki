import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getSearchedMovies = (page, keyword, sort, genre) => {
  const genreString = genre.join(',');

  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  }

  if (sort || genreString) {
    let discoverUrl = `/discover/movie?page=${page}`;

    if (sort) {
      discoverUrl += `&sort_by=${sort}`;
    }

    if (genreString) {
      discoverUrl += `&with_genres=${genreString}`;
    }

    return api.get(discoverUrl);
  }

  return api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = (keyword, sort, genre) => {
  return useInfiniteQuery({
    queryKey: ['movie-search', keyword, sort, genre],
    queryFn: ({ pageParam }) => getSearchedMovies(pageParam, keyword, sort, genre),
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
