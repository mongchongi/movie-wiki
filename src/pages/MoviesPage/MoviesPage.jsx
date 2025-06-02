import { useSearchParams } from 'react-router';
import { useMovieSearchQuery } from '../../hooks/useMovieSearchQuery';

const MoviesPage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');

  const { data } = useMovieSearchQuery(keyword);
  console.log('🚀 ~ MoviesPage ~ data:', data);

  return <div>MoviesPage</div>;
};

export default MoviesPage;
