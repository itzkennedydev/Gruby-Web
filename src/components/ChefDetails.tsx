import { MealItem } from '../data/mockChefs';
import Image from 'next/image';

interface ChefDetailsProps {
  chef: MealItem;
}

const DEFAULT_IMAGE = '/default-chef-image.webp';
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 200;

export function ChefDetails({ chef }: ChefDetailsProps) {
  const chefImage = chef.image ?? DEFAULT_IMAGE;
  const chefName = chef.name ?? 'Unknown Chef';

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{chefName}</h1>
      <Image
        src={chefImage}
        alt={chefName}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="rounded-lg"
        loading="lazy"
        priority={false}
      />
    </div>
  );
}
