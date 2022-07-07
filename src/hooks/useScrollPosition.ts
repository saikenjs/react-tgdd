import { useState } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useIsomorphicEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
