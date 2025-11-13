import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import styles from './MoviesPage.module.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useInView } from 'react-intersection-observer';

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchMovieQuery(keyword);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      {data?.movies.length ? (
        <>
          <div className={styles['movie-list']}>
            {data?.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          {isFetchingNextPage && (
            <p style={{ textAlign: 'center', fontWeight: 'bold', color: 'rgba(179, 87, 96, 1)' }}>LOADING...</p>
          )}
          <div ref={ref}></div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 184px)',
          }}
        >
          <p
            style={{
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            No results found for "{keyword}"
          </p>
        </div>
      )}
    </section>
  );
};

export default MoviesPage;
