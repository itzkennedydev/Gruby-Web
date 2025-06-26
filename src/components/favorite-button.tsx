'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  homeCookId: string;
}

export function FavoriteButton({ homeCookId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage when the component mounts
  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite-${homeCookId}`);
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite) as boolean);
    }
  }, [homeCookId]);

  function handleToggleFavorite(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite((prevState) => {
      const newFavoriteState = !prevState;
      localStorage.setItem(`favorite-${homeCookId}`, JSON.stringify(newFavoriteState));
      return newFavoriteState;
    });

    // Optionally, send a request to update the server here
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
      {isFavorite ? (
        <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
      ) : (
        <Heart className="w-6 h-6 text-white" />
      )}
    </Button>
  );
}
