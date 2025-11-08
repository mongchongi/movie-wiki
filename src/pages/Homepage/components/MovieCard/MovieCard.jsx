import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MovieCard.module.css';
import { faStarHalfStroke, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const movieCardRef = useRef(null);

  const handleViewDetails = (e, movieId) => {
    const isMobile = window.innerWidth <= 627;

    if (isMobile) {
      if (!isHovered) {
        e.preventDefault();
        setIsHovered(true);
      } else {
        setIsHovered(false);
        navigate(`/movies/${movieId}`);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isHovered && movieCardRef.current && !movieCardRef.current.contains(e.target)) {
        setIsHovered(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [isHovered]);

  return (
    <div
      className={styles['movie-card']}
      style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})` }}
      ref={movieCardRef}
      onClick={(e) => handleViewDetails(e, movie.id)}
    >
      <div className={styles['movie-card__info']}>
        <span className={`${styles['movie-card__adult']} ${movie.adult ? '' : styles['movie-card__adult--all']}`}>
          {movie.adult ? '+19' : 'ALL'}
        </span>
        <div className={styles['movie-card__genre-list']}>
          {movie.genre_ids.map((genreId) => (
            <div className={styles['movie-card__genre-item']} key={genreId}>
              {genreId}
            </div>
          ))}
        </div>
        <h3 className={styles['movie-card__title']}>{movie.title}</h3>
        <div className={styles['movie-card__stats']}>
          <p className={styles['movie-card__vote_average']}>
            <FontAwesomeIcon icon={faStarHalfStroke} color='rgba(255, 193, 7, 1)' />
            <span>{movie.vote_average.toFixed(1)}</span>
          </p>
          <p className={styles['movie-card__popularity']}>
            <FontAwesomeIcon icon={faUsers} color='rgba(64, 224, 208, 1)' />
            <span>{movie.popularity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
