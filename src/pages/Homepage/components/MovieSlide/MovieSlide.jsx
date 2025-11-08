import { useRef, useState } from 'react';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieSlide.module.css';

const MovieSlide = ({ title, type }) => {
  const [isScrollStart, setIsScrollStart] = useState(false);

  const { data, isLoading, isError } = useMoviesQuery(type);

  const movieSlideTrackRef = useRef(null);

  const handleScrollStart = () => {
    if (movieSlideTrackRef.current) {
      const { scrollLeft } = movieSlideTrackRef.current;

      if (scrollLeft > 0) {
        setIsScrollStart(true);
      } else {
        setIsScrollStart(false);
      }
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <div className={styles['movie-slide']}>
        <h2 className={styles['movie-slide__title']}>{title}</h2>
        <div className={styles['movie-slide__track']} ref={movieSlideTrackRef} onScroll={handleScrollStart}>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div
          className={`${styles['movie-slide__shadow']} ${isScrollStart ? styles['movie-slide__shadow--hidden'] : ''}`}
        ></div>
      </div>
    </section>
  );
};

export default MovieSlide;
