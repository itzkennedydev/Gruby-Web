import { useContext, useEffect, useState } from 'react';

export function useSafeContext<T>(context: React.Context<T | undefined>): T | undefined {
  const [isClient, setIsClient] = useState(false);
  const contextValue = useContext(context);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return undefined during SSR to prevent errors
  if (!isClient) {
    return undefined;
  }

  return contextValue;
} 