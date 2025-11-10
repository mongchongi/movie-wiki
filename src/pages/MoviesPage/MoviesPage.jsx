import { useSearchParams } from 'react-router';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import styles from './MoviesPage.module.css';
import MovieCard from '../../common/MovieCard/MovieCard';

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { data } = useSearchMovieQuery(keyword);
  console.log('🚀 ~ MoviesPage ~ data:', data);

  return (
    <>
      <section>
        <div></div>
        <div></div>
      </section>
      <section>
        <div className={styles['movie-list']}>
          {data?.results.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MoviesPage;
