import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTop.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ScrollToTop = () => {
  return (
    <button
      className={styles['scroll-to-top']}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    >
      <FontAwesomeIcon icon={faAngleUp} size='xl' />
    </button>
  );
};

export default ScrollToTop;
