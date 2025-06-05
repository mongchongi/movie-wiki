import styles from './MovieDetailPage.module.css';
import { useParams } from 'react-router';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import { useEffect, useState } from 'react';
import Info from './components/Info/Info';
import Review from './components/Review/Review';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery';
import { useMovieRecommendationsQuery } from '../../hooks/useMovieRecommendationsQuery';
import MovieSlide from '../../common/components/MovieSlide/MovieSlide';
import { useMovieTrailersQuery } from '../../hooks/useMovieTrailersQuery';
import VideoModal from '../../common/components/VideoModal/VideoModal';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ScrollToTop from '../../common/components/ScrollToTop/ScrollToTop';
import { useWindowScrollY } from '../../hooks/useWindowScrollY';

const MovieDetailPage = () => {
  const [tab, setTab] = useState('Details');
  const [showVideo, setShowVideo] = useState(false);

  const { id } = useParams();

  const { data: movieData } = useMovieDetailQuery(id);
  const { data: reviewsData } = useMovieReviewsQuery(id);
  const { data: recommendationData } = useMovieRecommendationsQuery(id);
  const { data: trailerData } = useMovieTrailersQuery(movieData?.id);

  const scrollY = useWindowScrollY();

  const randomIndex = Math.floor(Math.random() * trailerData?.results.length);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  return (
    <div>
      {showVideo && <VideoModal videoKey={trailerData.results[randomIndex].key} setShowVideo={setShowVideo} />}
      <div
        className={styles['banner']}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${movieData?.backdrop_path})`,
          backgroundColor: `${!movieData?.backdrop_path ? 'rgb(39, 39, 39)' : ''}`,
        }}
      >
        <button onClick={() => setShowVideo(true)} className={styles['banner__trailer']}>
          <FontAwesomeIcon icon={faPlay} />
          <span>Watch trailer</span>
        </button>
      </div>
      <div className={styles['tab']}>
        <div className={styles['tab__buttons']}>
          <button
            className={`${styles['tab__button']} ${tab === 'Details' ? styles['tab__button--active'] : ''}`}
            onClick={(e) => setTab(e.target.textContent)}
          >
            Details
          </button>
          <button
            className={`${styles['tab__button']} ${tab === 'Review' ? styles['tab__button--active'] : ''}`}
            onClick={(e) => setTab(e.target.textContent)}
          >
            Review
          </button>
        </div>
        <div className={styles['tab__contents']}>
          {tab === 'Details' && <Info movie={movieData} />}
          {tab === 'Review' && <Review reviews={reviewsData} />}
        </div>
      </div>
      <div className={styles['recommendations']}>
        <MovieSlide title='Recommendations' movies={recommendationData?.results} />
      </div>
      {scrollY > 50 && <ScrollToTop />}
    </div>
  );
};

export default MovieDetailPage;
