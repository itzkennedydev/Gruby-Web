import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AuthPage from './AuthPage';

const Home: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/DashboardPage');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <div>Redirecting to dashboard...</div>;
  }

  return <AuthPage />;
};

export default Home;
