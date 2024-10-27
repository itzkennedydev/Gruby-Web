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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  chef: {
    id: string;
    name: string;
    avatar: string;
  };
  otherMeals: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
  }[];
}
