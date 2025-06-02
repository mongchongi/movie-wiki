import MovieSlide from '../../../../common/components/MovieSlide/MovieSlide';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';

const TopRatedMovieSlide = () => {
  const { data } = useMoviesQuery('top_rated');

  return <MovieSlide title='Top Rated' movies={data?.results} />;
};

export default TopRatedMovieSlide;
