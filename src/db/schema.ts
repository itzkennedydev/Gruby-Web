import { pgTable, uuid, text, timestamp, integer, decimal, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm'; 

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIndex: sql`CREATE INDEX ON ${table} (email)`, 
}));

// Addresses Table
export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  type: text('type').notNull(), // 'Home', 'Work', 'Other'
  street: text('street').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  country: text('country').notNull(),
  zipCode: text('zip_code').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 6 }),
  longitude: decimal('longitude', { precision: 10, scale: 6 }),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIndex: sql`CREATE INDEX ON ${table} (user_id)`,
  uniqueDefaultAddress: sql`CREATE UNIQUE INDEX ON ${table} (user_id) WHERE is_default = true`,
  coordinatesIndex: sql`CREATE INDEX ON ${table} (latitude, longitude)`
}));

// Home Cooks Table
export const homeCooks = pgTable('home_cooks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Link to Clerk user ID
  name: text('name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  coverImageUrl: text('cover_image_url'),
  cuisine: text('cuisine').notNull(), // e.g., 'Italian', 'Mexican', 'Asian', 'American'
  experience: text('experience').notNull(), // e.g., 'Beginner', 'Intermediate', 'Advanced'
  // Stripe Connect fields
  stripeAccountId: text('stripe_account_id'),
  stripeAccountStatus: text('stripe_account_status'), // 'pending', 'active', 'restricted', 'disabled'
  onboardingCompleted: text('onboarding_completed').default('false').notNull(),
  businessName: text('business_name'),
  businessType: text('business_type'), // 'individual', 'company'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  stripeAccountIndex: sql`CREATE INDEX ON ${table} (stripe_account_id)`,
  onboardingStatusIndex: sql`CREATE INDEX ON ${table} (onboarding_completed)`,
  // Prevent duplicate Stripe accounts
  uniqueStripeAccount: sql`CREATE UNIQUE INDEX ON ${table} (stripe_account_id) WHERE stripe_account_id IS NOT NULL`,
  // Prevent duplicate home cooks per user
  uniqueUserHomeCook: sql`CREATE UNIQUE INDEX ON ${table} (user_id)`,
}));

// Products Table
export const products = pgTable('products', {
  id: integer('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  homeCookId: uuid('home_cook_id')
    .references(() => homeCooks.id, { onDelete: 'set null', onUpdate: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  homeCookIndex: sql`CREATE INDEX ON ${table} (home_cook_id)`,
  uniqueProduct: sql`CREATE UNIQUE INDEX ON ${table} (name, home_cook_id)`,
  priceCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_price CHECK (price >= 0.01 AND price <= 10000)`,
}));

// Orders Table
export const orders = pgTable('orders', {
  id: integer('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
  status: text('status').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIndex: sql`CREATE INDEX ON ${table} (user_id)`,
  statusIndex: sql`CREATE INDEX ON ${table} (status)`,
  totalCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_total CHECK (total >= 0)`,
}));

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: integer('id').primaryKey().notNull(),
  orderId: integer('order_id')
    .references(() => orders.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id, { onDelete: 'set null', onUpdate: 'cascade' })
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
}, (table) => ({
  quantityCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_quantity CHECK (quantity > 0 AND quantity <= 1000)`,
}));

// Shopping Cart Items Table
export const shoppingCartItems = pgTable('shopping_cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  productId: integer('product_id')
    .references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueCartItem: sql`CREATE UNIQUE INDEX ON ${table} (user_id, product_id)`,
  cartQuantityCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_cart_quantity CHECK (quantity > 0 AND quantity <= 100)`,
}));

// PostgreSQL triggers
export const createUpdatedAtTrigger = (tableName: string) => sql`
  CREATE TRIGGER update_${tableName}_updated_at
  BEFORE UPDATE ON ${tableName}
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
`;

export const createTriggerFunction = () => sql`
  CREATE OR REPLACE FUNCTION trigger_set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;