import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './VideoModal.module.css';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from '../../../hooks/useWindowSize';

const VideoModal = ({ videoKey, setShowVideo }) => {
  console.log('🚀 ~ VideoModal ~ videoKey:', videoKey);
  const windowWidth = useWindowSize();

  return (
    <div className={styles['video']}>
      <button className={styles['video__close']} onClick={() => setShowVideo(false)}>
        <FontAwesomeIcon icon={faXmark} size='xl' />
      </button>
      {videoKey ? (
        <YouTube
          videoId={videoKey}
          opts={{
            width: `${windowWidth <= 576 ? '335' : '560'}`,
            height: `${windowWidth <= 576 ? '215' : '315'}`,
            playerVars: {
              autoplay: 1,
              rel: 0,
            },
          }}
          onEnd={(e) => {
            e.target.stopVideo(0);
          }}
        />
      ) : (
        <div style={{ color: 'rgb(255, 255,255)' }}>There is no movie trailer.</div>
      )}
    </div>
  );
};

export default VideoModal;
