import { faClapperboard } from '@fortawesome/free-solid-svg-icons';
import styles from './NotFoundPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>
        4 <FontAwesomeIcon icon={faClapperboard} style={{ color: 'rgb(120, 199, 187)' }} /> 4
      </h1>
      <p className={styles['not-found__message']}>The page cannot be found.</p>
      <ul className={styles['not-found__link-list']}>
        <li className={styles['not-found__link-item']}>
          <Link to={'/'} className={styles['not-found__link']}>
            Home page
          </Link>
        </li>
        <li className={styles['not-found__link-item']}>
          <Link to={-1} className={styles['not-found__link']}>
            previous page
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NotFoundPage;
