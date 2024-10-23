// favorites-list.tsx

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface FavoriteItem {
  id: number;
  name: string;
  chef: string;
}

const mockFavorites: FavoriteItem[] = [
  { id: 1, name: 'Pasta Carbonara', chef: 'Chef Mario' },
  { id: 2, name: 'Vegan Burger', chef: 'Chef Lisa' },
];

function FavoriteItemComponent({ favorite }: { favorite: FavoriteItem }) {
  return (
    <li>
      <Card className="mb-4 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{favorite.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            by {favorite.chef}
          </CardDescription>
        </CardHeader>
      </Card>
    </li>
  );
}

export function FavoritesList() {
  const favorites = mockFavorites;

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
