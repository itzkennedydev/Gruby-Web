import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Chef } from '@/types';

// Constants for repeated values
const DEFAULT_IMAGE = '/default-chef-image.jpg';
const NO_DESCRIPTION = 'No description available.';

// Reusable ChefCard component
interface ChefCardProps {
  chef: Chef;
}

const ChefCard: React.FC<ChefCardProps> = ({ chef }) => {
  const chefImage = chef.coverImageUrl ?? DEFAULT_IMAGE;
  const chefName = chef.name ?? 'Unknown Chef';
  const chefBio = chef.bio ?? NO_DESCRIPTION;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <Link href={`/chef/${chef.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={chefImage}
            alt={chefName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{chefName}</h3>
          <p className="text-gray-600 text-sm">{chefBio}</p>
        </div>
      </Link>
    </div>
  );
};

// Main ChefList component
interface ChefListProps {
  chefs: Chef[];
}

const ChefList: React.FC<ChefListProps> = ({ chefs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {chefs.map((chef) => (
        <ChefCard key={chef.id} chef={chef} />
      ))}
    </div>
  );
};

export default ChefList;
