import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (
  bottomReachedFn: () => void,
  isLoading: boolean
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isLoading) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isBottom && !hasReachedBottom) {
        console.log('udario dno');
        setHasReachedBottom(true);
        bottomReachedFn();
      } else if (!isBottom) {
        setHasReachedBottom(false);
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
  }, [bottomReachedFn, isLoading]);

  return containerRef;
};
