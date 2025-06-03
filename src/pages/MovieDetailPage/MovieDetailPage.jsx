import styles from './MovieDetailPage.module.css';
import { useParams } from 'react-router';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import Loading from '../../common/components/Loading/Loading';
import { useState } from 'react';
import Info from './components/Info/Info';

const MovieDetailPage = () => {
  const [tab, setTab] = useState('Details');

  const { id } = useParams();

  const { data, isLoading } = useMovieDetailQuery(id);
  console.log('🚀 ~ MovieDetailPage ~ data:', data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        className={styles['banner']}
        style={{
          backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${data?.backdrop_path})`,
        }}
      ></div>
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
          {tab === 'Details' && <Info movie={data} />}
          {tab === 'Review' && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
