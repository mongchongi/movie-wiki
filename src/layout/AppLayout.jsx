import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import styles from './AppLayout.module.css';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useFilterStore } from '../store/useFilterStore';

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
  const [keyword, setKeyword] = useState('');

  const { pathname } = useLocation();

  const navMenuRef = useRef(null);
  const navSearchInputRef = useRef(null);

  const navigate = useNavigate();

  const resetFilters = useFilterStore((state) => state.resetFilters);

  const handleShowSearchInput = () => {
    setShowSearchInput((prevShowSearchInput) => !prevShowSearchInput);
  };

  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    resetFilters();

    navigate(`/movies?q=${keyword}`);

    setKeyword('');
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleClickOutside = (e) => {
      if (showMenu && navMenuRef.current && !navMenuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    if (showSearchInput) {
      setTimeout(() => {
        navSearchInputRef.current.focus();
      }, 800);
    }
  }, [showSearchInput]);

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
                  ref={navSearchInputRef}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
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
        )}
      </nav>
      <main className={styles['main']}>
        <Outlet />
      </main>
      <footer className={styles['footer']}>
        <div>
          <FontAwesomeIcon icon={faCopyright} />
          <span>2025 Movie Wiki. All Rights Reserved.</span>
        </div>
        <div>
          <Link to={'https://github.com/mongchongi/movie-wiki'} target='_blank'>
            <FontAwesomeIcon icon={faGithub} size='xl' />
          </Link>
        </div>
      </footer>
      <div className={styles['scroll-movement']}>
        <button
          type='button'
          className={styles['scroll-movement__button']}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          type='button'
          className={styles['scroll-movement__button']}
          onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: 'smooth' })}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </>
  );
};

export default AppLayout;
