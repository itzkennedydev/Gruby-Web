import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/server/db'; 
import { products, homeCooks, productImages } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { ProductDetails } from '@/components/ProductDetails';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Bug } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Product } from '@/types';
import BackButton from './BackButton';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    // Fetch product with home cook info
    const productResult = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        homeCookName: homeCooks.name,
      })
      .from(products)
      .leftJoin(homeCooks, eq(products.homeCookId, homeCooks.id))
      .where(eq(products.id, parseInt(id, 10)))
      .then((results) => results[0] ?? null);

    if (!productResult) {
      return null;
    }

    // Fetch product images
    const productImagesResult = await db
      .select({
        imageUrl: productImages.imageUrl,
        orderIndex: productImages.orderIndex,
      })
      .from(productImages)
      .where(eq(productImages.productId, parseInt(id, 10)))
      .orderBy(productImages.orderIndex);

    const images = productImagesResult.map(img => img.imageUrl);

    return {
      id: String(productResult.id),
      name: productResult.name,
      description: productResult.description ?? 'No description available',
      price: Number(productResult.price),
      homeCook: { name: productResult.homeCookName ?? 'Unknown Home Cook' }, 
      images: images.length > 0 ? images : ['/placeholder-image.jpg'],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getAvailableProductIds(): Promise<string[]> {
  try {
    const availableProducts = await db
      .select({ id: products.id })
      .from(products);

    return availableProducts.map((p) => String(p.id)); // Convert numbers to strings
  } catch (error) {
    console.error('Error fetching available product IDs:', error);
    return [];
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  const availableIds = await getAvailableProductIds();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <BackButton />
        </div>
        
        {product && <ProductDetails product={product} />}
      </div>
    </main>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const availableProducts = await db
      .select({ id: products.id })
      .from(products);

    return availableProducts.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 