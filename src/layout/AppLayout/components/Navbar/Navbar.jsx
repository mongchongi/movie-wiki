import { Link, useLocation } from 'react-router';
import styles from './Navbar.module.css';
import SearchForm from '../SearchForm/SearchForm';

const paths = [
  { name: 'Home', pathname: '/' },
  { name: 'Movies', pathname: '/movies' },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles['container']}>
      <nav className={styles['nav']}>
        <div className={styles['nav__logo']}>
          <Link to={'/'} className={styles['nav__logo-link']}>
            MOVIE WIKI
          </Link>
        </div>
        <ul className={styles['nav__list']}>
          {paths.map((item) => (
            <li key={item.name} className={styles['nav__item']}>
              <Link
                to={item.pathname}
                className={`${styles['nav__link']} ${item.pathname === pathname ? styles['nav__link--active'] : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <SearchForm />
      </nav>
    </div>
  );
};

export default Navbar;
