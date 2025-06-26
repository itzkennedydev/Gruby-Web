export interface HomeCook {
  id: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  bio: string | null;
  coverImage: string | null;
  cuisine: string;
  experience: string;
  rating?: number;
  image?: string; // Add this line to include the image property
}

export interface GeocodingResult {
  lat?: number;
  lon?: number;
  // Add other properties that might be in the result
  display_name?: string;
  place_id?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  homeCook: {
    name: string;
  };
}
