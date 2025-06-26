import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface FavoriteItem {
  id: number;
  name: string;
  homeCook: string;
}

interface FavoritesListProps {
  favorites: FavoriteItem[];
}

// Mock data (can be replaced with dynamic data later)
const mockFavorites: FavoriteItem[] = [
  { id: 1, name: 'Pasta Carbonara', homeCook: 'Home Cook Mario' },
  { id: 2, name: 'Vegan Burger', homeCook: 'Home Cook Lisa' },
];

// Reusable Favorite Item component
function FavoriteItemComponent({ favorite }: { favorite: FavoriteItem }) {
  return (
    <li>
      <Card className="mb-4 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{favorite.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            by {favorite.homeCook}
          </CardDescription>
        </CardHeader>
      </Card>
    </li>
  );
}

// Main Favorites List component
export function FavoritesList({ favorites = mockFavorites }: FavoritesListProps) {
  return (
    <div className="p-4">
      {favorites.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((favorite) => (
            <FavoriteItemComponent key={favorite.id} favorite={favorite} />
          ))}
        </ul>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
}
