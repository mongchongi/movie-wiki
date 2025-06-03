import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ currentOption, options, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className={styles['dropdown']} onClick={() => setShowOptions((prev) => !prev)} ref={dropdownRef}>
      <button
        className={`${styles['dropdown__current-option']} ${
          showOptions ? styles['dropdown__current-option--active'] : ''
        }`}
      >
        <span>{currentOption}</span>
        <FontAwesomeIcon icon={faChevronRight} size='xs' />
      </button>
      {showOptions && (
        <ul className={styles['dropdown__option-list']} onClick={onSelect}>
          {options.map((item) => (
            <li key={item.id} data-option={item.name} className={styles['dropdown__option-item']}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
