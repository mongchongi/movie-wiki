import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import styles from './MoviesPage.module.css';
import MovieCard from '../../common/MovieCard/MovieCard';
import { useInView } from 'react-intersection-observer';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import Dropdown from './components/Dropdown/Dropdown';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFilterStore } from '../../store/useFilterStore';

const MoviesPage = () => {
  const { selectedSort, selectedGenres, selectedGenreIds, setSelectedSort, setSelectedGenres } = useFilterStore();

  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { ref, inView } = useInView();

  const clearKeywordAndUrl = () => {
    const newQuery = new URLSearchParams(query);

    if (newQuery.has('q')) {
      newQuery.delete('q');
      setQuery(newQuery);
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchMovieQuery(
    keyword,
    selectedSort,
    selectedGenreIds
  );

  const { data: movieGenreData } = useMovieGenreQuery();

  const handleSelectSort = (e) => {
    if (e.target.tagName === 'LI') {
      setSelectedSort(e.target.textContent);

      if (keyword) {
        clearKeywordAndUrl();
      }
    }
  };

  const handleSelectFilter = (e) => {
    if (e.target.tagName === 'LI') {
      const newGenre = JSON.parse(e.target.dataset.genre);

      const isAlreadySelected = selectedGenres.some((genre) => genre.id === newGenre.id);

      if (!isAlreadySelected) {
        setSelectedGenres([...selectedGenres, newGenre]);
      }

      if (keyword) {
        clearKeywordAndUrl();
      }
    }
  };

  const handleReset = () => {
    setSelectedSort('');
    setSelectedGenres([]);
    clearKeywordAndUrl();
  };

  const handleDeleteSelectedGenres = (genreId) => {
    const newSelectedGenres = selectedGenres.filter((genre) => genre.id !== genreId);
    setSelectedGenres(newSelectedGenres);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  // useEffect(() => {
  //   console.log(selectedGenres);
  //   setSelectedGenreIds(selectedGenres.map((genre) => genre.id));
  // }, [selectedGenres]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [keyword]);

  return (
    <>
      <section>
        <div className={styles['discover']}>
          <div className={styles['discover__filter-controls']}>
            <Dropdown type='filter' selectedValue='Genre Filter' onSelect={handleSelectFilter}>
              {movieGenreData.map((genre) => (
                <li key={genre.id} data-genre={JSON.stringify(genre)}>
                  {genre.name}
                </li>
              ))}
            </Dropdown>
            <button className={styles['discover__clear-button']} type='button' onClick={handleReset}>
              Clear All
            </button>
          </div>
          <Dropdown type='sort' selectedValue={selectedSort} onSelect={handleSelectSort}>
            <li>popularity.asc</li>
            <li>popularity.desc</li>
          </Dropdown>
        </div>
        <ul className={styles['selected-filters']}>
          {selectedGenres.map((genre) => (
            <li className={styles['selected-filters__item']} key={genre.id}>
              <p>{genre.name}</p>
              <button
                className={styles['selected-filters__delete-button']}
                type='button'
                onClick={() => handleDeleteSelectedGenres(genre.id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </li>
          ))}
        </ul>
      </section>
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
    </>
  );
};

export default MoviesPage;
