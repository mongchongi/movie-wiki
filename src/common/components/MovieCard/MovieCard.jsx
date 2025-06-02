import { faCircleInfo, faFire, faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from './MovieCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';
import { useMovieGenreQuery } from '../../../hooks/useMovieGenreQuery';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIds) => {
    if (!genreData) {
      return [];
    }

    const genreNames = genreIds.map((id) => {
      const genreObj = genreData.find((item) => item.id === id);
      return genreObj.name;
    });

    return genreNames;
  };

  return (
    <div
      className={styles['movie-card']}
      style={{ backgroundImage: `url(https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path})` }}
    >
      <div className={styles['movie-card__info']}>
        <h4 className={styles['movie-card__title']}>{movie.title}</h4>
        <div className={styles['movie-card__genres']}>
          {showGenre(movie.genre_ids).map((item) => (
            <div key={item} className={styles['movie-card__genre']}>
              {item}
            </div>
          ))}
        </div>
        <div className={styles['movie-card__stats']}>
          <div className={styles['movie-card__average']}>
            <FontAwesomeIcon icon={faFire} />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className={styles['movie-card__popularity']}>
            <FontAwesomeIcon icon={faUsers} />
            <span>{movie.popularity}</span>
          </div>
          <div
            className={styles['movie-card__adult']}
            style={{ color: `${movie.adult ? 'rgb(220, 20, 60);' : 'rgb(120, 199, 187)'}` }}
          >
            {movie.adult ? '+18' : 'ALL'}
          </div>
        </div>
        <Link to={`/movies/${movie.id}`} className={styles['movie-card__details-link']}>
          <FontAwesomeIcon icon={faCircleInfo} />
          <span>View details</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
