
import { useEffect, useState } from 'react';

// Export the existing useMediaQuery function
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Add the useIsMobile function that was missing but is used in sidebar.tsx
export const useIsMobile = (): boolean => {
  return useMediaQuery("(max-width: 768px)");
};
