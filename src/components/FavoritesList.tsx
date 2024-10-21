import React from 'react';

const FavoritesList: React.FC = () => {
  // Mock data for demonstration purposes
  const favorites = [
    { id: 1, name: 'Pasta Carbonara', chef: 'Chef Mario' },
    { id: 2, name: 'Vegan Burger', chef: 'Chef Lisa' },
    // Add more favorites as needed
  ];

  return (
    <div>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(favorite => (
            <li key={favorite.id} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{favorite.name}</span>
                <span className="text-sm text-gray-500">by {favorite.chef}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default FavoritesList;
