import Banner from './components/Banner/Banner';
import MoviesSlide from '../../common/MovieSlide/MovieSlide';
import { useEffect } from 'react';

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <MoviesSlide title='POPULAR' type='popular' />
      <MoviesSlide title='TOP RATED' type='top_rated' />
      <MoviesSlide title='UPCOMING' type='upcoming' />
    </>
  );
};

export default Homepage;
