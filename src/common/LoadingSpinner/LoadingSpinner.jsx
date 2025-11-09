import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles['loading-spinner']}>
      <div></div>
      <p>LOADING...</p>
    </div>
  );
};

export default LoadingSpinner;
