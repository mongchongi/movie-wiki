import { useState } from 'react';
import styles from './MovieSlide.module.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from '../MovieCard/MovieCard';
import 'swiper/css';

const MovieSlide = ({ title, movies }) => {
  const [swiper, setSwiper] = useState();

  return (
    <div className={styles['movie-slide']}>
      <h3>{title}</h3>
      <div className={styles['movie-slide__controls']}>
        <button className={styles['movie-slide__button']} onClick={() => swiper?.slidePrev()}>
          <FontAwesomeIcon icon={faChevronLeft} size='lg' />
        </button>
        <button className={styles['movie-slide__button']} onClick={() => swiper?.slideNext()}>
          <FontAwesomeIcon icon={faChevronRight} size='lg' />
        </button>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        onSwiper={(e) => setSwiper(e)}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {movies?.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard movie={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlide;
