import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotFoundPage.module.css';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className={styles['not-found']}>
      <FontAwesomeIcon className={styles['not-found__icon']} icon={faTriangleExclamation} />
      <p className={styles['not-found__message']}>Sorry, the page you requested could not be found.</p>
      <Link className={styles['not-found__go-to-home']} to={'/'}>
        Go to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
