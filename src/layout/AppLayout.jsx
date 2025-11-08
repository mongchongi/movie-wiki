import { Link, Outlet, useLocation } from 'react-router';
import styles from './AppLayout.module.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const pages = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Movies',
    path: '/movies',
  },
];

const AppLayout = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { pathname } = useLocation();

  const navMenuRef = useRef(null);

  const handleShowSearchInput = () => {
    setShowSearchInput((prevShowSearchInput) => !prevShowSearchInput);
  };

  const handleShowMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={styles['nav']}>
        <div className={styles['nav__header']}>
          <div className={styles['nav__logo']}>
            <Link to={'/'}>
              <img src='/movie-wiki.svg' alt='movie wiki logo' />
            </Link>
          </div>
          {windowWidth > 627 && (
            <ul className={styles['nav__menu']}>
              {pages.map((page) => (
                <li className={styles['nav__menu-item']} key={page.name}>
                  <Link
                    to={page.path}
                    style={{ color: `${pathname === page.path ? 'rgba(179, 87, 96, 1)' : ''}` }}
                    onClick={handleShowMenu}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className={styles['nav__controls']}>
            <div className={styles['nav__search-overlay']}>
              <form
                className={`${styles['nav__search']} ${showSearchInput ? styles['nav__search--show'] : ''}`}
                onSubmit={handleSearch}
              >
                <button type='button' className={styles['nav__search-toggler']} onClick={handleShowSearchInput}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size='xl' />
                </button>
                <input
                  className={`${styles['nav__search-input']} ${
                    showSearchInput ? styles['nav__search-input--visible'] : ''
                  }`}
                  type='text'
                  placeholder='Search...'
                />
                <button type='submit' hidden></button>
              </form>
            </div>
            <button type='button' className={styles['nav__menu-toggler']} onClick={handleShowMenu}>
              <div></div>
              <div></div>
              <div></div>
            </button>
          </div>
        </div>
        {windowWidth <= 627 && (
          <div className={`${styles['nav__menu-overlay']} ${showMenu ? styles['nav__menu-overlay--open'] : ''}`}>
            <ul className={`${styles['nav__menu']} ${showMenu ? styles['nav__menu--show'] : ''}`} ref={navMenuRef}>
              {pages.map((page) => (
                <li className={styles['nav__menu-item']} key={page.name}>
                  <Link
                    to={page.path}
                    style={{ color: `${pathname === page.path ? 'rgba(179, 87, 96, 1)' : ''}` }}
                    onClick={handleShowMenu}
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
