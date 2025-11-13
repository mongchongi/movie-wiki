import { useEffect, useRef, useState } from 'react';
import styles from './ReviewItem.module.css';

const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const reviewContentRef = useRef(null);

  useEffect(() => {
    if (reviewContentRef.current) {
      const isEllipsisApplied = reviewContentRef.current.classList.contains(styles['review__content--ellipsis']);
      reviewContentRef.current.classList.remove(styles['review__content--ellipsis']);

      const actualScrollHeight = reviewContentRef.current.scrollHeight;

      if (isEllipsisApplied) {
        reviewContentRef.current.classList.add(styles['review__content--ellipsis']);
      }

      if (actualScrollHeight > 55.1953) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [review.content, isExpanded]);

  return (
    <li className={styles['review']}>
      <h4 className={styles['review__author']}>{review.author}</h4>
      <p className={styles['review__created-at']}>{review.created_at.slice(0, 10)}</p>
      <p
        className={`${styles['review__content']} ${isExpanded ? styles['review__content--ellipsis'] : ''}`}
        ref={reviewContentRef}
      >
        {review.content}
      </p>
      {showMoreButton && (
        <button className={styles['review__toggler']} type='button' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'More' : 'Less'}
        </button>
      )}
    </li>
  );
};

export default ReviewItem;
