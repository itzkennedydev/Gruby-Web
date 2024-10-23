import { MealItem } from '../data/mockChefs';
import Image from 'next/image';

interface ChefDetailsProps {
  chef: MealItem;
}

export function ChefDetails({ chef }: ChefDetailsProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{chef.name}</h1>
      <Image
        src={chef.image || '/default-chef-image.webp'}
        alt={chef.name}
        width={300}
        height={200}
        className="rounded-lg"
        loading="lazy"
        priority={false}
      />
    </div>
  );
}
