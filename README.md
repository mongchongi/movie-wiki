# MOVIE WIKI

TMDB API를 활용한 영화 정보 웹 사이트

![](./public/screenshot/image1.png)

- Demo : https://movie-wiki-six.vercel.app/

  <br />

## 개발 목표

- 실무에서 자주 사용하는 기술 스택을 활용해 실제 서비스 형태의 프로젝트를 구현과 실전 프로젝트 개발 능력 강화 목표
- 다양한 라이브러리 사용법 숙지

  <br/>

## 사용 기술

- React
- React Router
- TanStack Query
- CSS Module
- Swiper
- React Suspense
- react-error-boundary
- react-intersection-observer

  <br />

## 주요 기능

### 인기, TOP 20, 개봉예정 영화 목록 캐러셀

- Swiper 라이브러리 활용 구현

![](./public/screenshot/2025-07-1015-ezgif.com-video-to-gif-converter.gif)

```javascript
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
```

<br />

### 영화 목록 무한 스크롤

- TanStack Query의 useInfiniteQuery와 react-intersection-observer 라이브러리 활용 구현

![](./public/screenshot/2025-07-1014-ezgif.com-video-to-gif-converter.gif)

```javascript
export const useMovieSearchQuery = (keyword, sortBy, genreId) => {
  return useInfiniteQuery({
    queryKey: ['movie-search', keyword, sortBy, genreId],
    queryFn: ({ pageParam }) => fetchMovieSearch(keyword, sortBy, genreId, pageParam),
    getNextPageParam: ({ data }) => {
      if (data.page < Math.min(data.total_pages, 500)) {
        return data.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
  });
};
```

```javascript
// import { useInView } from 'react-intersection-observer';
const { ref, inView } = useInView();

useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView]);

if (isLoading) {
  return <Loading />;
}
```

```javascript
<div ref={ref} style={{ minHeight: '20px' }}>
  {isFetchingNextPage && <div className={styles['movies-page__spinner']}></div>}
</div>
```

<br />

## 문재해결
- 인기, TOP 20, 개봉예정 영화 목록을 어떻게 캐러셀로 구현할 수 있을까?
  - Swiper 라이브러리를 활용
- 영화 목록을 어떻게 무한 스크롤로 구현할 수 있을까?
  - TanStack Query의 useInfiniteQuery와 react-intersection-observer를 활용
- 한 페이지에서 데이터를 여러 번 요청할 때 각 요청에 대한 로딩 또는 에러 상태를 어떻게 한 번에 처리할 수 있을까?
  - React의 Suspense와 react-error-boundary 라이브러리를 활용