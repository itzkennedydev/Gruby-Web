import type { Product } from './Product';

export type FavoriteItem = Omit<Product, 'id' | 'homeCook'> & {
  id: number;
  homeCook: string;
};
