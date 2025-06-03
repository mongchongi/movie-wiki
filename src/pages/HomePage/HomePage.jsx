import { Suspense } from 'react';
import styles from './HomePage.module.css';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';
import Loading from '../../common/components/Loading/Loading';

const HomePage = () => {
  return (
    <div className={styles['container']}>
      <Suspense fallback={<Loading />}>
        <Banner />
        <PopularMovieSlide />
        <TopRatedMovieSlide />
        <UpcomingMovieSlide />
      </Suspense>
    </div>
  );
};

export default HomePage;
