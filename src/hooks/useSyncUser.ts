import { useCallback } from 'react';

interface UserData {
  email?: string;
  name: string;
  avatar_url: string;
}

export function useSyncUser() {
  return useCallback(async (userData: UserData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      console.log('User inserted or already exists');
    } catch (error) {
      console.error('Failed to insert user:', error);
    }
  }, []);
}
