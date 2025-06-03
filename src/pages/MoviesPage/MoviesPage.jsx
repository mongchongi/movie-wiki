import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router';
import { useMovieSearchQuery } from '../../hooks/useMovieSearchQuery';
import MovieCard from '../../common/components/MovieCard/MovieCard';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovieSearchQuery(keyword);
  console.log('🚀 ~ MoviesPage ~ data:', data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={styles['container']}>
      <div className={styles['filters']}>필터링 부분</div>
      <ul className={styles['movies-page__list']}>
        {data?.pages.map((page) =>
          page.data.results.map((item) => (
            <li key={item.id} className={styles['movies-page__item']}>
              <MovieCard movie={item} />
            </li>
          ))
        )}
      </ul>
      <div ref={ref} style={{ height: '30px' }}></div>
    </div>
  );
};

export default MoviesPage;
