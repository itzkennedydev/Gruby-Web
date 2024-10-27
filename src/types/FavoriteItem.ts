import type { Product } from './Product';

export type FavoriteItem = Omit<Product, 'id' | 'chef'> & {
  id: number;
  chef: string;
};
