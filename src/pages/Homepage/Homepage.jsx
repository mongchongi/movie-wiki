import Banner from './components/Banner/Banner';
import MoviesSlide from './components/MovieSlide/MovieSlide';

const Homepage = () => {
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
