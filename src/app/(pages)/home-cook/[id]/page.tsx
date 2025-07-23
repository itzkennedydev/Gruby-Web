import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Heart, Clock, Award, ChefHat, Users, ShoppingBag } from 'lucide-react';
import { db } from '@/server/db';
import { homeCooks, type HomeCook, type Product } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import HomeCookDetailClient from './HomeCookDetailClient';

interface SerializedProduct extends Omit<Product, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  images: string[];
}

interface HomeCookWithProducts extends Omit<HomeCook, 'createdAt' | 'updatedAt'> {
  products: SerializedProduct[];
  createdAt: string;
  updatedAt: string;
}

interface HomeCookPageProps {
  params: Promise<{ id: string }>;
}

async function getHomeCook(id: string): Promise<HomeCookWithProducts | null> {
  // Validate that id is a valid UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return null;
  }

  const homeCook = await db.query.homeCooks.findFirst({
    where: eq(homeCooks.id, id),
    with: { 
      products: {
        with: {
          images: true
        }
      }
    },
  });

  if (!homeCook) {
    return null;
  }

  return {
    ...homeCook,
    createdAt: homeCook.createdAt.toISOString(),
    updatedAt: homeCook.updatedAt.toISOString(),
    products: homeCook.products.map(product => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
      images: product.images.map(img => img.imageUrl),
    })),
  };
}

export default async function HomeCookPage({ params }: HomeCookPageProps) {
  const { id } = await params;
  const homeCook = await getHomeCook(id);

  if (!homeCook) {
    notFound();
  }

  return <HomeCookDetailClient homeCook={homeCook} />;
}

// Generate static params for better performance
export async function generateStaticParams() {
  try {
    const allHomeCooks = await db
      .select({ id: homeCooks.id })
      .from(homeCooks);

    return allHomeCooks.map((homeCook) => ({
      id: homeCook.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 