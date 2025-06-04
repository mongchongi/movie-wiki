import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorFallback.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles['error']}>
      <div className={styles['error__message']}>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span>{error.message}</span>
        <button onClick={resetErrorBoundary} className={styles['error__reset']}>
          try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
