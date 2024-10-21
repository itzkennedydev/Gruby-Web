import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { MealItem } from '~/data/mockChefs';
import { Product } from '~/data/mockProducts';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '~/components/ui/button';
import { useCart } from '~/contexts/CartContext';
import { toast } from 'react-hot-toast';

interface SearchResult {
  chefs: MealItem[];
  dishes: Product[];
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query;
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery<SearchResult>({
    queryKey: ['search', q],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q as string)}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    },
    enabled: !!q,
  });

  const handleAddToCart = (dish: Product) => {
    addToCart(dish);
    toast.success(`${dish.name} added to cart!`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for &quot;{q}&quot;</h1>
      
      {data?.chefs && data.chefs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Chefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.chefs.map((chef) => (
              <Link href={`/chef/${chef.id}`} key={chef.id} className="block">
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Image src={chef.image} alt={chef.name} width={400} height={300} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{chef.name}</h3>
                    <p className="text-gray-600">{chef.category}</p>
                    <p className="text-yellow-500">★ {chef.rating.toFixed(1)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {data?.dishes && data.dishes.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.dishes.map((dish) => (
              <div key={dish.id} className="border rounded-lg overflow-hidden shadow-md">
                <Image src={dish.image} alt={dish.name} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <p className="text-gray-600 mb-2">{dish.description}</p>
                  <p className="text-lg font-bold mb-2">${dish.price.toFixed(2)}</p>
                  <Button onClick={() => handleAddToCart(dish)}>Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(!data?.chefs || data.chefs.length === 0) && (!data?.dishes || data.dishes.length === 0) && (
        <p className="text-xl text-gray-600">No results found for &quot;{q}&quot;.</p>
      )}
    </div>
  );
};

export default SearchPage;
