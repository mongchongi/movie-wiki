import { useEffect, useRef, useState } from 'react';
import styles from './Review.module.css';

const Review = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [longReviews, setLongReviews] = useState({});

  const contentRefs = useRef([]);

  const handleToggleExpand = (reviewId) => {
    setExpandedReviews((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  useEffect(() => {
    const newLongReviews = {};

    reviews.results.forEach((item) => {
      const el = contentRefs.current[item.id];

      if (el) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const lines = (el.scrollHeight / lineHeight).toFixed(0);

        if (lines > 4) {
          newLongReviews[item.id] = true;
        }
      }
    });

    setLongReviews(newLongReviews);
  }, [reviews]);

  return (
    <>
      {!reviews.results.length ? (
        <div className={styles['no-review']}>There is no registered review.</div>
      ) : (
        <div className={styles['review']}>
          {reviews.results.map((item) => (
            <div key={item.id} className={styles['review__info']}>
              <h3 className={styles['review__author']}>{item.author}</h3>
              <div className={styles['review__created-at']}>{new Date(item.created_at).toLocaleString('en-US')}</div>
              <div
                className={`${styles['review__content']} ${
                  expandedReviews[item.id] ? styles['review__content--expanded'] : ''
                }`}
                ref={(el) => (contentRefs.current[item.id] = el)}
              >
                {item.content}
              </div>
              {longReviews[item.id] && (
                <button className={styles['review__more']} onClick={() => handleToggleExpand(item.id)}>
                  {expandedReviews[item.id] ? 'collapse' : 'see more'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Review;
