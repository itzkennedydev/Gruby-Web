import { nanoid } from 'nanoid';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  chef: string;
}

export const mockProducts: Product[] = [
  {
    id: nanoid(),
    name: 'Deluxe Sushi Platter',
    description: 'A mouthwatering assortment of fresh sushi, including nigiri, maki, and sashimi.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Hiroshi',
  },
  {
    id: nanoid(),
    name: 'Authentic Ramen Bowl',
    description: 'Rich and flavorful ramen with homemade noodles, tender chashu pork, and a perfectly soft-boiled egg.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Hiroshi',
  },
  {
    id: nanoid(),
    name: 'Tempura Assortment',
    description: 'Crispy and light tempura featuring a variety of seasonal vegetables and seafood.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Hiroshi',
  },
  {
    id: nanoid(),
    name: 'Gourmet Taco Platter',
    description: 'A selection of artisanal tacos featuring various meats and vegetarian options with homemade salsas.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Maria',
  },
  {
    id: nanoid(),
    name: 'Enchiladas Verdes',
    description: 'Authentic Mexican enchiladas with a tangy green sauce, topped with queso fresco and crema.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Maria',
  },
  {
    id: nanoid(),
    name: 'Guacamole and Chips',
    description: 'Fresh, creamy guacamole made tableside, served with crispy tortilla chips.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1595020271321-64bab63d7f48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Maria',
  },
  {
    id: nanoid(),
    name: 'Authentic Pad Thai',
    description: 'Traditional Thai stir-fried rice noodles with tofu, shrimp, peanuts, and tamarind sauce.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Supaporn',
  },
  {
    id: nanoid(),
    name: 'Neapolitan Margherita Pizza',
    description: 'Classic Italian pizza with San Marzano tomatoes, fresh mozzarella, and basil on a thin, crispy crust.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Giovanni',
  },
  {
    id: nanoid(),
    name: 'Authentic Beef Pho',
    description: 'Traditional Vietnamese noodle soup with tender beef slices, rice noodles, and aromatic herbs.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Nguyen',
  },
  {
    id: nanoid(),
    name: 'Greek Moussaka',
    description: 'Layered eggplant casserole with seasoned ground beef, topped with creamy béchamel sauce.',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    chef: 'Chef Eleni',
  },
];

export function addProduct(product: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...product,
    id: nanoid(),
  };
  mockProducts.push(newProduct);
  return newProduct;
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id);
}
