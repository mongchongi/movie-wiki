import { Link } from 'react-router';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';
import styles from './Banner.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const { data } = useMoviesQuery('popular');

  const randomIndex = Math.floor(Math.random() * data?.results.length);

  return (
    <div
      className={styles['banner']}
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${data?.results[randomIndex].backdrop_path})`,
      }}
    >
      <div className={styles['banner__info']}>
        <h2 className={styles['banner__title']}>{data?.results[randomIndex].title}</h2>
        <p className={styles['banner__overview']}>{data?.results[randomIndex].overview}</p>
        <div className={styles['banner__actions']}>
          <button className={`${styles['banner__button']} ${styles['banner__button--trailer']}`}>
            <FontAwesomeIcon icon={faPlay} />
            <span>Watch trailer</span>
          </button>
          <Link
            to={`/movies/${data?.results[randomIndex].id}`}
            className={`${styles['banner__button']} ${styles['banner__button--details']}`}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <span>View details</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
