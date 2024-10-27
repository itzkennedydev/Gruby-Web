import React from 'react';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import { db } from '@/server/db'; 
import { products } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { ProductDetails } from '@/components/ProductDetails';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Bug } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Product } from '@/types';

interface ProductPageProps {
  product: Product | null;
  debugInfo: {
    requestedId: string;
    availableIds: string[];
  };
}

function ProductPage({ product, debugInfo }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
              <p className="text-lg font-medium">Loading product details...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              Product Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                We couldn&apos;t find the product you&apos;re looking for.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="h-4 w-4" />
                <h3 className="font-semibold">Debug Information</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Requested ID:</span> {debugInfo.requestedId}</p>
                <p><span className="font-medium">Available IDs:</span></p>
                <div className="flex flex-wrap gap-2">
                  {debugInfo.availableIds.map((id) => (
                    <code key={id} className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {id}
                    </code>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button
                onClick={() => router.push('/')}
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        {product && <ProductDetails product={product} />}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id, 10)))
      .then((results) => results[0] ?? null);

    const formattedProduct: Product | null = product ? {
      id: String(product.id), // Convert number to string
      name: product.name,
      description: product.description ?? 'No description available',
      price: Number(product.price),
      chef: { name: product.chefId }, 
      images: product.imageUrl ? [product.imageUrl] : ['/placeholder-image.jpg'],
    } : null;

    const availableProducts = await db
      .select({ id: products.id })
      .from(products);

    const debugInfo = {
      requestedId: id,
      availableIds: availableProducts.map((p) => String(p.id)), // Convert numbers to strings
    };

    return {
      props: {
        product: formattedProduct,
        debugInfo,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      props: {
        product: null,
        debugInfo: {
          requestedId: id,
          availableIds: [],
        },
      },
    };
  }
}

export default ProductPage;
