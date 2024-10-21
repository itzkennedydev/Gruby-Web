import Link from 'next/link';
import { mockChefs, MealItem } from '../data/mockChefs';

export default function ChefList() {
  return (
    <div>
      {mockChefs.map((chef: MealItem) => (
        <Link key={chef.id} href={`/chef/${chef.id}`}>
          <div>{chef.name}</div>
        </Link>
      ))}
    </div>
  );
}
