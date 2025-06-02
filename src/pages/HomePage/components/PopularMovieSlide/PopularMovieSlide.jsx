import MovieSlide from '../../../../common/components/MovieSlide/MovieSlide';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';

const PopularMovieSlide = () => {
  const { data } = useMoviesQuery('popular');

  return <MovieSlide title='Popular' movies={data?.results} />;
};

export default PopularMovieSlide;
