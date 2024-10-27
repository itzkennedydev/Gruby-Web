export interface Chef {
  id: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  bio: string | null;
  coverImageUrl: string | null;
  specialty: string;
  rating?: number;
  image?: string; // Add this line to include the image property
}

export interface GeocodingResult {
  lat?: number;
  lon?: number;
  display_name?: string;
  // Add any other properties that might be returned by your geocoding service
}
