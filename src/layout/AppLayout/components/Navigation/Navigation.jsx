import styles from './Navigation.module.css';
import { Link, useLocation } from 'react-router';

const paths = [
  { name: 'Home', pathname: '/' },
  { name: 'Movies', pathname: '/movies' },
];

const Navigation = ({ setShowMenu }) => {
  const { pathname } = useLocation();

  return (
    <ul className={styles['navigation']}>
      {paths.map((item) => (
        <li key={item.name} className={styles['navigation__item']}>
          <Link
            to={item.pathname}
            className={`${styles['navigation__link']} ${
              item.pathname === pathname ? styles['navigation__link--active'] : ''
            }`}
            onClick={() => setShowMenu(false)}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
