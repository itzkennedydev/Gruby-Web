'use client';

import { useState, useEffect } from 'react';
import { Heart, HeartFill } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  chefId: string;
}

export function FavoriteButton({ chefId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage when the component mounts
  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite-${chefId}`);
    if (storedFavorite) {
      setIsFavorite(JSON.parse(storedFavorite) as boolean);
    }
  }, [chefId]);

  function handleToggleFavorite(event: React.MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite((prevState) => {
      const newFavoriteState = !prevState;
      localStorage.setItem(`favorite-${chefId}`, JSON.stringify(newFavoriteState));
      return newFavoriteState;
    });

    // Optionally, send a request to update the server here
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggleFavorite}>
      {isFavorite ? (
        <HeartFill className="w-6 h-6 text-red-500" />
      ) : (
        <Heart className="w-6 h-6 text-white" />
      )}
    </Button>
  );
}
