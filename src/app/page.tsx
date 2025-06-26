'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useSyncUser } from '@/hooks/useSyncUser';
import MainPage from './(pages)/MainPage';

export default function HomePage() {
  const { isLoaded, user } = useUser();
  const syncUser = useSyncUser();

  useEffect(() => {
    if (isLoaded && user) {
      void syncUser({
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? '',
        avatar_url: user.imageUrl ?? '',
      });
    }
  }, [isLoaded, user, syncUser]);

  return <MainPage />;
} 