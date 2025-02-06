import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (bottomReachedFn: () => void) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        // bottomReachedFn();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [bottomReachedFn]);

  return containerRef;
};
