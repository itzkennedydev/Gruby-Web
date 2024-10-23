'use client';

import { useState } from 'react';
import { Heart, HeartFill } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FavoriteButtonProps {
  chefId: string;
}

export function FavoriteButton({ chefId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  function handleToggleFavorite(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIsFavorite(!isFavorite);
    // Optionally, send a request to update the server
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
