import MovieSlide from '../../../../common/components/MovieSlide/MovieSlide';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';

const UpcomingMovieSlide = () => {
  const { data } = useMoviesQuery('upcoming');

  return <MovieSlide title='Upcoming' movies={data?.results} />;
};

export default UpcomingMovieSlide;
