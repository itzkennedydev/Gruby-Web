import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { HomeCook } from '@/types';

// Constants for repeated values
const DEFAULT_IMAGE = '/default-home-cook-image.jpg';
const NO_DESCRIPTION = 'No description available.';

// Reusable HomeCookCard component
interface HomeCookCardProps {
  homeCook: HomeCook;
}

const HomeCookCard: FC<HomeCookCardProps> = ({ homeCook }) => {
  const homeCookImage = homeCook.image ?? DEFAULT_IMAGE; 
  const homeCookName = homeCook.name ?? 'Unknown Home Cook'; 
  const homeCookDescription = homeCook.bio ?? NO_DESCRIPTION; 

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <Link href={`/home-cook/${homeCook.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={homeCookImage}
            alt={homeCookName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{homeCookName}</h3>
          <p className="text-gray-600 text-sm">{homeCookDescription}</p>
          <p className="text-gray-500 text-xs mt-1">Cuisine: {homeCook.cuisine}</p>
          <p className="text-gray-500 text-xs">Experience: {homeCook.experience}</p>
        </div>
      </Link>
    </div>
  );
};

// Main HomeCookList component
interface HomeCookListProps {
  homeCooks: HomeCook[];
}

const HomeCookList: FC<HomeCookListProps> = ({ homeCooks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {homeCooks.map((homeCook) => (
        <HomeCookCard key={homeCook.id} homeCook={homeCook} />
      ))}
    </div>
  );
};

export default HomeCookList;
