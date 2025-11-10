import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MovieCard.module.css';
import { faStarHalfStroke, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIds) => {
    if (!genreData) {
      return [];
    }

    const genres = genreIds.map((id) => genreData.find((genre) => genre.id === id));

    return genres;
  };

  return (
    <div
      className={styles['movie-card']}
      style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})` }}
    >
      <Link to={`/movies/${movie.id}`}>
        <div className={styles['movie-card__info']}>
          <span className={`${styles['movie-card__adult']} ${movie.adult ? '' : styles['movie-card__adult--all']}`}>
            {movie.adult ? '+19' : 'ALL'}
          </span>
          <div className={styles['movie-card__genre-list']}>
            {showGenre(movie.genre_ids).map((genre) => (
              <div className={styles['movie-card__genre-item']} key={genre.id}>
                {genre.name}
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
      </Link>
    </div>
  );
};

export default MovieCard;
