import { usePopularMoviesQuery } from '../../../../hooks/useMoviesQuery';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import styles from './PopularMovieSlide.module.css';

const PopularMovieSlide = () => {
  const { data, isLoading, isError } = usePopularMoviesQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles['movie-slide']}>
      <h2 className={styles['movie-slide__title']}>POPULAR</h2>
      <div className={styles['movie-slide__track']}>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className={styles['movie-slide__shadow']}></div>
    </div>
  );
};

export default PopularMovieSlide;
