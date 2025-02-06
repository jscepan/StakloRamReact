import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (
  bottomReachedFn: () => void,
  isLoading: boolean
) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasReachedBottomRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isLoading) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isBottom && !hasReachedBottomRef.current) {
        console.log('udario dno');
        hasReachedBottomRef.current = true;
        bottomReachedFn();
      } else if (!isBottom) {
        hasReachedBottomRef.current = false;
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
