import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Loader2, ChefHat, AlertCircle } from 'lucide-react';
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/db/db';
import { sql } from 'drizzle-orm';
import { chefs, products } from '@/db/schema';
import debounce from 'lodash.debounce';  // Debouncing mechanism

interface Chef {
  id: string;
  name: string;
  avatarUrl: string;  // Frontend field for avatar URL
  category: string;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export async function getServerSideProps(context: { query: { q?: string } }) {
  const { q } = context.query;
  let chefsData: Chef[] = [];
  let productsData: Product[] = [];

  if (q) {
    const searchTerm = `%${q.trim().toLowerCase()}%`;  // Normalize the search term

    // SQL query for chefs
    const chefResults = await db.execute(sql`
      SELECT id, name, avatar_url, 'General' as category
      FROM ${chefs}
      WHERE TRIM(LOWER(name)) ILIKE ${searchTerm}
    `);
    chefsData = chefResults.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      avatarUrl: row.avatar_url as string,  // Map avatar_url to avatarUrl
      category: row.category as string,
    }));

    // SQL query for products
    const productResults = await db.execute(sql`
      SELECT id, name, image_url, price, description
      FROM ${products}
      WHERE TRIM(LOWER(name)) ILIKE ${searchTerm} OR TRIM(LOWER(description)) ILIKE ${searchTerm}
    `);
    productsData = productResults.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      imageUrl: row.image_url as string,
      price: Number(row.price),
      description: row.description as string,
    }));
  }

  return {
    props: {
      initialData: { chefs: chefsData, products: productsData },
      query: q || '',
    },
  };
}

interface SearchPageProps {
  initialData: { chefs: Chef[]; products: Product[] };
  query: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialData, query }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [data, setData] = useState<{ chefs: Chef[]; products: Product[] }>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search request
  const fetchSearchResults = debounce(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const newData = await res.json();
      setData(newData);
    } catch {
      setError('Failed to load search results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, 300); // Debounce of 300ms

  useEffect(() => {
    if (router.query.q !== query) {
      fetchSearchResults(router.query.q as string);
    }
  }, [router.query.q, query]);

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    toast({
      title: `Added ${product.name} to cart`,
      description: 'View cart to checkout',
      action: {
        label: 'View Cart',
        onClick: () => router.push('/cart'),
      },
    });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Search Results for &quot;{router.query.q || query}&quot;
        </h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching...
          </div>
        )}
      </div>

      {/* Chefs Section */}
      {data?.chefs && data.chefs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Featured Chefs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.chefs.map((chef) => (
              <Link href={`/chef/${chef.id}`} key={chef.id} className="transition-transform hover:scale-105">
                <Card>
                  <CardHeader className="relative p-0">
                    <div className="relative h-48 w-full">
                      <img src={chef.avatarUrl} alt={chef.name} className="object-cover w-full h-full rounded-t-lg" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle>{chef.name}</CardTitle>
                    <CardDescription>{chef.category}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      {data?.products && data.products.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Available Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative h-48">
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full rounded-t-lg" />
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      ${product.price.toFixed(2)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {!isLoading && (!data?.chefs?.length && !data?.products?.length) && (
        <Alert>
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            Try adjusting your search terms or browse our featured items instead.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SearchPage;
