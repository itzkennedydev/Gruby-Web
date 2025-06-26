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
import { homeCooks, products } from '@/server/db/schema';
import debounce from 'lodash.debounce';  // Debouncing mechanism
import Image from 'next/image';

interface HomeCook {
  id: string;
  name: string;
  avatarUrl: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

export async function getServerSideProps(context: { query: { q?: string } }) {
  const { q } = context.query;
  let homeCooksData: HomeCook[] = [];
  let productsData: Product[] = [];

  if (q) {
    const searchTerm = `%${q.trim().toLowerCase()}%`;  // Normalize the search term

    // SQL query for home cooks
    const homeCookResults = await db.execute(sql`
      SELECT id, name, "avatarUrl", cuisine as category
      FROM ${homeCooks}
      WHERE TRIM(LOWER(name)) ILIKE ${searchTerm}
    `);
    homeCooksData = homeCookResults.rows.map(row => ({
      id: row.id as string,
      name: row.name as string,
      avatarUrl: row.avatarUrl as string,
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
      initialData: { homeCooks: homeCooksData, products: productsData },
      query: q ?? '',
    },
  };
}

interface SearchPageProps {
  initialData: { homeCooks: HomeCook[]; products: Product[] };
  query: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ initialData, query }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [data, setData] = useState<{ homeCooks: HomeCook[]; products: Product[] }>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search request
  const fetchSearchResults = debounce(async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch search results');
      const newData = await res.json() as { homeCooks: HomeCook[]; products: Product[] };
      setData(newData);
    } catch {
      setError('Failed to load search results. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, 300); // Debounce of 300ms

  useEffect(() => {
    if (router.query.q !== query) {
      void fetchSearchResults(router.query.q as string);
    }
  }, [router.query.q, query, fetchSearchResults]); // Add fetchSearchResults to the dependency array

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: 1 });
    toast({
      title: `Added ${product.name} to cart`,
      description: 'View cart to checkout',
      action: (
        <Button variant="outline" size="sm" onClick={() => router.push('/cart')}>
          View Cart
        </Button>
      ),
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
          Search Results for &quot;{router.query.q ?? query}&quot;
        </h1>
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Searching...
          </div>
        )}
      </div>

      {/* Home Cooks Section */}
      {data?.homeCooks && data.homeCooks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ChefHat className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Featured Home Cooks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.homeCooks.map((homeCook) => (
              <Link href={`/home-cook/${homeCook.id}`} key={homeCook.id} className="transition-transform hover:scale-105">
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={homeCook.avatarUrl}
                        alt={homeCook.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle>{homeCook.name}</CardTitle>
                    <CardDescription>{homeCook.category}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
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
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name} 
                      width={500} 
                      height={300} 
                      layout="responsive"
                    />
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

      {!isLoading && (!data?.homeCooks?.length && !data?.products?.length) && (
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
