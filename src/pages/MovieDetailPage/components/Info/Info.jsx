import styles from './Info.module.css';
import { faDollarSign, faFire, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Info = ({ movie }) => {
  return (
    <div className={styles['movie-detail']}>
      <h2 className={styles['movie-detail__title']}>{movie?.title}</h2>
      <div className={styles['movie-detail__tagline']}>{movie?.tagline}</div>
      <div className={styles['movie-detail__genres']}>
        {movie?.genres.map((item) => (
          <div key={item.id} className={styles['movie-detail__genre']}>
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles['movie-detail__stats']}>
        <div className={styles['movie-detail__average']}>
          <FontAwesomeIcon icon={faFire} />
          <span>{movie?.vote_average.toFixed(1)}</span>
        </div>
        <div className={styles['movie-detail__popularity']}>
          <FontAwesomeIcon icon={faUsers} />
          <span>{movie?.popularity}</span>
        </div>
        <div
          className={styles['movie-detail__adult']}
          style={{ color: `${movie?.adult ? 'rgb(220, 20, 60);' : 'rgb(120, 199, 187)'}` }}
        >
          {movie?.adult ? '+18' : 'ALL'}
        </div>
      </div>
      <div className={styles['movie-detail__overview']}>{movie?.overview}</div>
      <div className={styles['movie-detail__budget']}>
        <span className={styles['movie-detail__label']}>Budget</span>
        <span>
          <FontAwesomeIcon icon={faDollarSign} /> {movie?.budget.toLocaleString()}
        </span>
      </div>
      <div className={styles['movie-detail__revenue']}>
        <span className={styles['movie-detail__label']}>Revenue</span>
        <span>
          <FontAwesomeIcon icon={faDollarSign} /> {movie?.revenue.toLocaleString()}
        </span>
      </div>
      <div className={styles['movie-detail__release-date']}>
        <span className={styles['movie-detail__label']}>Release date</span>
        <span>{movie?.release_date}</span>
      </div>
      <div className={styles['movie-detail__runtime']}>
        <span className={styles['movie-detail__label']}>Runtime</span>
        <span>{movie?.runtime} minute</span>
      </div>
    </div>
  );
};

export default Info;
