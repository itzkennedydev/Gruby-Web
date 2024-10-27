export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  chefId: string;
  createdAt: Date;
  updatedAt: Date;
}
