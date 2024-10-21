import Image from 'next/image';
import { MealItem } from '../data/mockChefs';

interface ChefDetailsProps {
  chef: MealItem;
}

export default function ChefDetails({ chef }: ChefDetailsProps) {
  return (
    <div>
      <h1>{chef.name}</h1>
      <Image src={chef.image} alt={chef.name} width={300} height={200} />
      {/* Add more chef details here */}
    </div>
  );
}
