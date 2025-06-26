-- Update existing home cooks who have completed onboarding but don't have subscription status
-- This ensures products created before subscription requirement are still visible
UPDATE home_cooks 
SET subscription_status = 'inactive' 
WHERE subscription_status IS NULL AND onboarding_completed = 'true';

-- Update home cooks who haven't completed onboarding to have proper default values
UPDATE home_cooks 
SET subscription_status = 'inactive', onboarding_completed = 'false' 
WHERE subscription_status IS NULL; 