export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  chefId: string;
  createdAt: Date;
  updatedAt: Date;
}
