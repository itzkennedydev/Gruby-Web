// pages/index.tsx
import type { NextPage } from 'next';
import MainPage from './MainPage';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const HomePage: NextPage = () => {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          avatar_url: user.profileImageUrl,
        }),
      });

      if (!response.ok) {
        console.error('Failed to insert user:', await response.text());
      } else {
        console.log('User inserted or already exists');
      }
    };

    syncUser();
  }, [isLoaded, user]);

  return <MainPage />;
};

export default HomePage;
