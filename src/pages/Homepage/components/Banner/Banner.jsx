import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';
import styles from './Banner.module.css';
import { Link } from 'react-router';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Banner = () => {
  const { data } = useMoviesQuery('popular');

  const randomIndex = Math.floor(Math.random() * data?.results.length);

  return (
    <section>
      <div
        className={styles['banner']}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[randomIndex].backdrop_path})`,
        }}
      >
        <div className={styles['banner__content']}>
          <h1 className={styles['banner__title']}>{data?.results[randomIndex].title}</h1>
          <p className={styles['banner__overview']}>{data?.results[randomIndex].overview}</p>
          <Link className={styles['banner__detail-button']} to={`/movies/${data?.results[randomIndex].id}`}>
            <FontAwesomeIcon icon={faCircleInfo} size='lg' />
            <span>Details</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
