import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Product, getProductById, mockProducts } from '~/data/mockProducts';

interface ProductPageProps {
  product: Product | null;
  debugInfo: {
    requestedId: string;
    availableIds: string[];
  };
}

export default function ProductPage({ product, debugInfo }: ProductPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>Requested ID: {debugInfo.requestedId}</p>
        <p>Available IDs: {debugInfo.availableIds.join(', ')}</p>
        <p>Please check the product ID and try again.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Chef: {product.chef}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  const { id } = context.params as { id: string };
  const product = getProductById(id);

  const debugInfo = {
    requestedId: id,
    availableIds: mockProducts.map(p => p.id),
  };

  return {
    props: {
      product: product ?? null,
      debugInfo,
    },
  };
};
