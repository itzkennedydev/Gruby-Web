-- Add sample ratings to existing home cooks
-- This script adds some sample reviews to test the rating system

-- First, let's add some sample reviews for existing home cooks
-- We'll need to get some home cook IDs first

-- Add sample reviews (you'll need to replace the UUIDs with actual home cook IDs from your database)
-- You can get the IDs by running: SELECT id, name FROM home_cooks;

-- Example reviews (replace the UUIDs with actual home cook IDs):
INSERT INTO reviews (home_cook_id, user_id, rating, comment, created_at, updated_at) VALUES
-- Replace 'home-cook-uuid-1' with actual home cook ID
('home-cook-uuid-1', 'user_123', 5, 'Amazing food! The pasta was perfectly cooked and the sauce was delicious.', NOW(), NOW()),
('home-cook-uuid-1', 'user_456', 4, 'Great experience, food was fresh and tasty. Will order again!', NOW(), NOW()),
('home-cook-uuid-1', 'user_789', 5, 'Best homemade Italian food I''ve had in a long time. Highly recommend!', NOW(), NOW()),

-- Replace 'home-cook-uuid-2' with actual home cook ID  
('home-cook-uuid-2', 'user_123', 4, 'Delicious Mexican food, authentic flavors.', NOW(), NOW()),
('home-cook-uuid-2', 'user_456', 5, 'Incredible tacos! The salsa was perfect.', NOW(), NOW()),

-- Replace 'home-cook-uuid-3' with actual home cook ID
('home-cook-uuid-3', 'user_789', 5, 'Fantastic Indian cuisine, the curry was amazing!', NOW(), NOW()),
('home-cook-uuid-3', 'user_123', 4, 'Great food and friendly service.', NOW(), NOW()),
('home-cook-uuid-3', 'user_456', 5, 'Authentic Indian flavors, highly recommend!', NOW(), NOW());

-- Update home cook average ratings (this will be done automatically by the API, but here's how to do it manually)
-- You'll need to replace the UUIDs with actual home cook IDs

-- Example for updating a home cook's rating:
-- UPDATE home_cooks 
-- SET average_rating = (
--   SELECT ROUND(AVG(rating)::numeric, 2) 
--   FROM reviews 
--   WHERE home_cook_id = 'home-cook-uuid-1'
-- ),
-- total_reviews = (
--   SELECT COUNT(*) 
--   FROM reviews 
--   WHERE home_cook_id = 'home-cook-uuid-1'
-- )
-- WHERE id = 'home-cook-uuid-1';

-- To see current ratings:
-- SELECT hc.name, hc.average_rating, hc.total_reviews, COUNT(r.id) as review_count
-- FROM home_cooks hc
-- LEFT JOIN reviews r ON hc.id = r.home_cook_id
-- GROUP BY hc.id, hc.name, hc.average_rating, hc.total_reviews
-- ORDER BY hc.average_rating DESC; 