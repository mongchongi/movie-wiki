import { useMoviesQuery } from '../../hooks/useMoviesQuery';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieSlide.module.css';

const MovieSlide = ({ title, type }) => {
  const { data } = useMoviesQuery(type);

  return (
    <section>
      <div className={styles['movie-slide']}>
        <h2 className={styles['movie-slide__title']}>{title}</h2>
        <div className={styles['movie-slide__track']}>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSlide;
