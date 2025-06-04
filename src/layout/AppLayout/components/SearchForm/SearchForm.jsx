import styles from './SearchForm.module.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const SearchForm = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [keyword, setKeyword] = useState('');

  const windowWidth = useWindowSize();

  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const searchWrapRef = useRef(null);

  const handleToggleSearchForm = () => {
    setShowSearchForm((prev) => !prev);
  };

  const handleSearchForKeywords = (e) => {
    e.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setShowSearchForm(false);
    setKeyword('');
  };

  useEffect(() => {
    const wrapEl = searchWrapRef.current;
    const handleTransitionEnd = () => {
      if (showSearchForm) {
        searchInputRef.current?.focus();
      }
    };

    wrapEl?.addEventListener('transitionend', handleTransitionEnd);
    return () => wrapEl.removeEventListener('transitionend', handleTransitionEnd);
  }, [showSearchForm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setShowSearchForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchWrapRef]);

  return (
    <div className={styles['search']}>
      <div
        ref={searchWrapRef}
        className={`${styles['search__wrap']} ${showSearchForm ? styles['search__wrap--toggle'] : ''}`}
      >
        {!(windowWidth <= 576) && (
          <button className={styles['search__button']} onClick={handleToggleSearchForm}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size='lg' />
          </button>
        )}
        <form className={styles['search__form']} onSubmit={handleSearchForKeywords}>
          <input
            type='text'
            placeholder='Search'
            className={styles['search__input']}
            ref={searchInputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
