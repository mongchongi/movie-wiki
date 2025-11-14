import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ type, selectedValue, onSelect, children }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const label = type === 'filter' ? 'Genre Filter' : selectedValue ? selectedValue : 'Sort By';

  const handleDropdownClick = (e) => {
    onSelect(e);

    if (e.target.tagName === 'LI') {
      setIsOptionsVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOptionsVisible(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles['dropdown']} ref={dropdownRef} onClick={handleDropdownClick}>
      <button type='button' onClick={() => setIsOptionsVisible(!isOptionsVisible)}>
        <span>{label}</span>
        <FontAwesomeIcon
          className={`${styles['dropdown__icon']} ${isOptionsVisible ? styles['dropdown__icon--upside-down'] : ''}`}
          icon={faSortDown}
        />
      </button>
      <ul
        className={`${styles['dropdown__option-list']} ${
          isOptionsVisible ? styles['dropdown__option-list--visible'] : ''
        }`}
      >
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
