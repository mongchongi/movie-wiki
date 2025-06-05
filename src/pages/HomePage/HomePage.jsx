import { Suspense, useState } from 'react';
import styles from './HomePage.module.css';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';
import Loading from '../../common/components/Loading/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../common/components/ErrorFallback/ErrorFallback';
import ScrollToTop from '../../common/components/ScrollToTop/ScrollToTop';
import { useWindowScrollY } from '../../hooks/useWindowScrollY';

const HomePage = () => {
  const scrollY = useWindowScrollY();

  return (
    <div className={styles['container']}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading />}>
          <Banner />
          <PopularMovieSlide />
          <TopRatedMovieSlide />
          <UpcomingMovieSlide />
        </Suspense>
      </ErrorBoundary>
      {scrollY > 50 && <ScrollToTop />}
    </div>
  );
};

export default HomePage;
