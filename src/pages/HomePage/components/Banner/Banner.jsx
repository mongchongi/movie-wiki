import { Link } from 'react-router';
import { useMoviesQuery } from '../../../../hooks/useMoviesQuery';
import styles from './Banner.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useMovieTrailersQuery } from '../../../../hooks/useMovieTrailersQuery';
import { useState } from 'react';
import VideoModal from '../../../../common/components/VideoModal/VideoModal';

const Banner = () => {
  const [showVideo, setShowVideo] = useState(false);

  const { data: popularMovieData } = useMoviesQuery('popular');

  const { data: trailerData } = useMovieTrailersQuery(popularMovieData?.results[0].id);

  const randomIndex = Math.floor(Math.random() * trailerData?.results.length);

  return (
    <>
      {showVideo && (
        <VideoModal
          videoKey={trailerData?.results.length === 0 ? '' : trailerData?.results[randomIndex].key}
          setShowVideo={setShowVideo}
        />
      )}
      <div
        className={styles['banner']}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${popularMovieData?.results[0].backdrop_path})`,
          backgroundColor: `${!popularMovieData?.results[0].backdrop_path ? 'rgb(39, 39, 39)' : ''}`,
        }}
      >
        <div className={styles['banner__info']}>
          <h2 className={styles['banner__title']}>{popularMovieData?.results[0].title}</h2>
          <p className={styles['banner__overview']}>{popularMovieData?.results[0].overview}</p>
          <div className={styles['banner__actions']}>
            <button
              className={`${styles['banner__button']} ${styles['banner__button--trailer']}`}
              onClick={() => setShowVideo(true)}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span>Watch trailer</span>
            </button>
            <Link
              to={`/movies/${popularMovieData?.results[0].id}`}
              className={`${styles['banner__button']} ${styles['banner__button--details']}`}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>View details</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
