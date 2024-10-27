// pages/index.tsx
import type { NextPage } from 'next';
import MainPage from './MainPage';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSyncUser } from '@/hooks/useSyncUser';

const HomePage: NextPage = () => {
  const { isLoaded, user } = useUser();
  const syncUser = useSyncUser();

  useEffect(() => {
    if (isLoaded && user) {
      syncUser({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? '',
        avatar_url: user.imageUrl ?? '',
      });
    }
  }, [isLoaded, user, syncUser]);

  return <MainPage />;
};

export default HomePage;
