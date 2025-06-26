export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  coordinates: Coordinates;
}

export interface Chef {
  id: string;
  name: string;
  avatar: string;
}

export interface Meal {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
}

export interface HomeCook {
  id: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  specialty?: string;
  rating?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  homeCook: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  otherMeals: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }[];
}
