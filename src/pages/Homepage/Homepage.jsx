import { Suspense, useEffect } from 'react';
import Banner from './components/Banner/Banner';
import MoviesSlide from '../../common/MovieSlide/MovieSlide';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Banner />
      <MoviesSlide title='POPULAR' type='popular' />
      <MoviesSlide title='TOP RATED' type='top_rated' />
      <MoviesSlide title='UPCOMING' type='upcoming' />
    </Suspense>
  );
};

export default Homepage;
