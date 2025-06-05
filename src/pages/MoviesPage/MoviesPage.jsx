import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router';
import { useMovieSearchQuery } from '../../hooks/useMovieSearchQuery';
import MovieCard from '../../common/components/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loading from '../../common/components/Loading/Loading';
import Dropdown from './components/Dropdown/Dropdown';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import { useWindowScrollY } from '../../hooks/useWindowScrollY';
import ScrollToTop from '../../common/components/ScrollToTop/ScrollToTop';

const MoviesPage = () => {
  const [currentSort, setCurrentSort] = useState('Sort by');
  const [currentGenre, setCurrentGenre] = useState('Genre');

  const scrollY = useWindowScrollY();

  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { data: genreData } = useMovieGenreQuery();

  const sortData = [
    { id: 1, name: 'popularity.desc' },
    { id: 2, name: 'popularity.asc' },
  ];

  const genre = genreData?.find((item) => item.name === currentGenre);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovieSearchQuery(
    keyword,
    currentSort,
    genre?.id
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles['movies-page']}>
      <div className={styles['movies-page__filters']}>
        <Dropdown
          currentOption={currentSort}
          options={sortData}
          onSelect={(e) => setCurrentSort(e.target.dataset.option)}
        />
        <Dropdown
          currentOption={currentGenre}
          options={genreData}
          onSelect={(e) => setCurrentGenre(e.target.dataset.option)}
        />
      </div>
      <ul className={styles['movies-page__list']}>
        {data?.pages.every((page) => page.data.results.length === 0) ? (
          <div className={styles['movies-page__no-item']}>There is no movie information.</div>
        ) : (
          data?.pages.map((page) =>
            page.data.results.map((item) => (
              <li key={item.id} className={styles['movies-page__item']}>
                <MovieCard movie={item} />
              </li>
            ))
          )
        )}
      </ul>
      <div ref={ref} style={{ minHeight: '20px' }}>
        {isFetchingNextPage && <div className={styles['movies-page__spinner']}></div>}
      </div>
      {scrollY > 50 && <ScrollToTop />}
    </div>
  );
};

export default MoviesPage;
