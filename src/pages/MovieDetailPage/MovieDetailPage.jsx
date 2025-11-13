import { useParams } from 'react-router';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import styles from './MovieDetailPage.module.css';
import { faMoneyBillWave, faStarHalfStroke, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMovieCreditsQuery } from '../../hooks/useMovieCreditsQuery';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery';
import ReviewItem from './components/ReviewItem/ReviewItem';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useMovieVideosQuery } from '../../hooks/useMovieVideosQuery';
import YouTube from 'react-youtube';
import { useState } from 'react';

const MovieDetailPage = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);

  const { id } = useParams();

  const { data: movieData } = useMovieDetailQuery(id);

  const { data: movieCreditData } = useMovieCreditsQuery(id);

  const { data: movieReviewData } = useMovieReviewsQuery(id);

  const { data: movieVideoData } = useMovieVideosQuery(id);

  const backdropUrl = {
    '--backdrop-url': `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${movieData?.backdrop_path})`,
  };

  const posterUrl = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movieData?.poster_path}`;

  const hour = parseInt(movieData?.runtime / 60);
  const min = movieData?.runtime % 60;

  const budget = movieData?.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleShowTrailer = () => {
    setRandomIndex(Math.floor(Math.random() * movieVideoData?.results.length));
    setShowTrailer(!showTrailer);
  };

  return (
    <>
      {showTrailer && (
        <div className={styles['trailer-modal']} onClick={handleShowTrailer}>
          <YouTube
            videoId={movieVideoData?.results[randomIndex].key}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
              },
            }}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />
        </div>
      )}
      <section>
        <div className={styles['movie-detail']}>
          <div className={styles['movie-detail__backdrop']} style={backdropUrl}>
            <img className={styles['movie-detail__poster']} src={posterUrl} alt={`${movieData?.title} poster`} />
            <div className={styles['movie-detail__info']}>
              <h1 className={styles['movie-detail__title']}>{movieData?.title}</h1>
              <div className={styles['movie-detail__meta']}>
                <p>{movieData?.release_date}</p>
                <p>
                  {hour}hour {min}min
                </p>
              </div>
              <ul className={styles['movie-detail__genre-list']}>
                {movieData?.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
              <p className={styles['movie-detail__overview']}>{movieData?.overview}</p>
              <div className={styles['movie-detail__stats']}>
                <p>
                  <FontAwesomeIcon icon={faStarHalfStroke} color='rgba(255, 193, 7, 1)' />
                  <span>{movieData?.vote_average.toFixed(1)}</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faUsers} color='rgba(64, 224, 208, 1)' />
                  <span>{movieData?.popularity}</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faMoneyBillWave} color='rgba(76, 175, 80, 1)' />
                  <span>{budget}</span>
                </p>
              </div>
              <button className={styles['movie-detail__trailer-button']} type='button' onClick={handleShowTrailer}>
                <FontAwesomeIcon icon={faYoutube} />
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 style={{ color: 'rgba(179, 87, 96, 1)', marginTop: '48px' }}>Main Cast</h2>
        <ul className={styles['movie-cast']}>
          {movieCreditData?.cast.map((castMember) => (
            <li key={castMember.id} className={styles['movie-cast__item']}>
              <img
                className={styles['movie-cast__profile']}
                src={
                  castMember.profile_path
                    ? `https://media.themoviedb.org/t/p/w276_and_h350_face/${castMember.profile_path}`
                    : 'https://t4.ftcdn.net/jpg/07/91/22/59/360_F_791225927_caRPPH99D6D1iFonkCRmCGzkJPf36QDw.jpg'
                }
                alt={`${castMember.name} profile`}
              />
              <h4 className={styles['movie-cast__name']}>{castMember.name}</h4>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 style={{ color: 'rgba(179, 87, 96, 1)', marginTop: '48px' }}>Reviews</h2>
        <ul className={styles['movie-review']}>
          {movieReviewData?.results.length ? (
            movieReviewData?.results.map((review) => <ReviewItem key={review.id} review={review} />)
          ) : (
            <p>There are currently no user reviews for this title.</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default MovieDetailPage;
