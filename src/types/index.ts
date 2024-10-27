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
}
