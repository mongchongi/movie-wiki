import { useEffect, useState } from 'react';

export const useWindowScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScrollY = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollY);
    return () => window.removeEventListener('scroll', handleScrollY);
  });

  return scrollY;
};
