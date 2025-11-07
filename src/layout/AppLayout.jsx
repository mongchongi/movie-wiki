import { Link, Outlet, useLocation } from 'react-router';
import styles from './AppLayout.module.css';
import { useEffect, useRef, useState } from 'react';
import magnifyingGlass from '../assets/magnifying-glass.svg';

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

  const navNavigationRef = useRef(null);

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
            <ul className={styles['nav__navigation']}>
              {pages.map((page) => (
                <li className={styles['nav__navigation-item']} key={page.name}>
                  <Link
                    to={page.path}
                    style={{ color: `${pathname === page.path ? 'rgba(255,255,255, 1)' : ''}` }}
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
                  <img src={magnifyingGlass} alt='magnifying glass icon' />
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
          <div
            className={`${styles['nav__navigation-overlay']} ${
              showMenu ? styles['nav__navigation-overlay--open'] : ''
            }`}
          >
            <ul
              className={`${styles['nav__navigation']} ${showMenu ? styles['nav__navigation--show'] : ''}`}
              ref={navNavigationRef}
            >
              {pages.map((page) => (
                <li className={styles['nav__navigation-item']} key={page.name}>
                  <Link
                    to={page.path}
                    style={{ color: `${pathname === page.path ? 'rgba(255,255,255, 1)' : ''}` }}
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
