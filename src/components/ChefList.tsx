import Image from 'next/image';
import Link from 'next/link';
import { MealItem, mockChefs } from '../data/mockChefs';

// Constants for repeated values
const DEFAULT_IMAGE = '/default-chef-image.webp';
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;
const NO_DESCRIPTION = 'No description available';

// Reusable ChefCard component
interface ChefCardProps {
  chef: MealItem;
}

function ChefCard({ chef }: ChefCardProps) {
  const chefImage = chef.image ?? DEFAULT_IMAGE;
  const chefName = chef.name ?? 'Unknown Chef';
  const chefDescription = chef.description ?? NO_DESCRIPTION;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
      <Image
        src={chefImage}
        alt={chefName}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="rounded-t-lg"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{chefName}</h2>
        <p className="text-gray-600">{chefDescription}</p>
      </div>
    </div>
  );
}

// Main ChefList component
export function ChefList() {
  return (
    <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {mockChefs.map((chef: MealItem) => (
        <Link key={chef.id} href={`/chef/${chef.id}`}>
          <ChefCard chef={chef} />
        </Link>
      ))}
    </div>
  );
}
