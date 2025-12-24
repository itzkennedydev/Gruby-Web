/**
 * Creator Application Types
 * Matches the types in the mobile app
 */

export type CreatorApplicationStatus = 'pending' | 'approved' | 'rejected';
export type CookingExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';
export type CuisineSpecialty =
  | 'italian'
  | 'mexican'
  | 'asian'
  | 'american'
  | 'mediterranean'
  | 'indian'
  | 'french'
  | 'middle_eastern'
  | 'african'
  | 'caribbean'
  | 'vegan'
  | 'baking'
  | 'desserts'
  | 'healthy'
  | 'budget'
  | 'quick_meals'
  | 'other';

export interface CreatorApplication {
  id: string;
  userId: string;
  userEmail: string;
  userDisplayName: string;
  userPhotoURL?: string;
  status: CreatorApplicationStatus;
  reason: string;
  experience: CookingExperienceLevel;
  specialties: CuisineSpecialty[];
  socialLinks?: string[];
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  reviewerName?: string;
  reviewNotes?: string;
  rejectionReason?: string;
}

export const EXPERIENCE_LEVEL_LABELS: Record<CookingExperienceLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  professional: 'Professional Chef',
};

export const CUISINE_SPECIALTY_LABELS: Record<CuisineSpecialty, string> = {
  italian: 'Italian',
  mexican: 'Mexican',
  asian: 'Asian',
  american: 'American',
  mediterranean: 'Mediterranean',
  indian: 'Indian',
  french: 'French',
  middle_eastern: 'Middle Eastern',
  african: 'African',
  caribbean: 'Caribbean',
  vegan: 'Vegan/Plant-Based',
  baking: 'Baking',
  desserts: 'Desserts',
  healthy: 'Healthy/Wellness',
  budget: 'Budget Cooking',
  quick_meals: 'Quick Meals',
  other: 'Other',
};
