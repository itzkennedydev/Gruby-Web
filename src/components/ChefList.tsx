import Image from 'next/image';
import Link from 'next/link';
import { MealItem, mockChefs } from '../data/mockChefs';

export function ChefList() {
  return (
    <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {mockChefs.map((chef: MealItem) => (
        <Link key={chef.id} href={`/chef/${chef.id}`}>
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <Image
              src={chef.image || '/default-chef-image.webp'}
              alt={chef.name}
              width={300}
              height={200}
              className="rounded-t-lg"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{chef.name}</h2>
              <p className="text-gray-600">
                {chef.description || 'No description available'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
