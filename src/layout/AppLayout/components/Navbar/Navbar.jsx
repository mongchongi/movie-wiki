import { Link } from 'react-router';
import styles from './Navbar.module.css';
import SearchForm from '../SearchForm/SearchForm';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Navigation from '../Navigation/Navigation';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const windowWidth = useWindowSize();

  return (
    <div className={styles['container']}>
      <nav className={styles['nav']}>
        <div className={styles['nav__logo']}>
          <Link to={'/'} className={styles['nav__logo-link']}>
            MOVIE WIKI
          </Link>
        </div>
        {windowWidth <= 576 ? (
          <>
            <button className={styles['nav__menu-button']} onClick={() => setShowMenu(true)}>
              <FontAwesomeIcon icon={faBars} size='xl' />
            </button>
            <div className={`${styles['nav__menu']} ${showMenu ? styles['nav__menu--active'] : ''}`}>
              <button
                className={`${styles['nav__menu-button']} ${styles['nav__menu-button--close']}`}
                onClick={() => setShowMenu(false)}
              >
                <FontAwesomeIcon icon={faXmark} size='xl' />
              </button>
              <Navigation setShowMenu={setShowMenu} />
              <SearchForm />
            </div>
          </>
        ) : (
          <>
            <Navigation />
            <SearchForm />
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
