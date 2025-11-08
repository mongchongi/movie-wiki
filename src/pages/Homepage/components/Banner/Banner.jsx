import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';
import styles from './Banner.module.css';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useMoviesQuery('popular');

  const randomIndex = Math.floor(Math.random() * data?.results.length);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

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
          <div className={styles['banner__controls']}>
            <button className={styles['banner__button']} type='button'>
              <FontAwesomeIcon icon={faCirclePlay} size='lg' />
              <span>Watch Trailer</span>
            </button>
            <button
              className={styles['banner__button']}
              type='button'
              onClick={() => navigate(`/movies/${data?.results[randomIndex].id}`)}
            >
              <FontAwesomeIcon icon={faCircleInfo} size='lg' />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
