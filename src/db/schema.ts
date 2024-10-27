import { pgTable, uuid, text, timestamp, integer, decimal, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm'; 

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
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

// Chefs Table
export const chefs = pgTable('chefs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  bannerUrl: text('banner_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products Table
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  chefId: uuid('chef_id')
    .references(() => chefs.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  chefIndex: sql`CREATE INDEX ON ${table} (chef_id)`,
  uniqueProduct: sql`CREATE UNIQUE INDEX ON ${table} (name, chef_id)`,
  priceCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_price CHECK (price >= 0.01 AND price <= 10000)`,
}));

// Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  addressId: uuid('address_id')
    .references(() => addresses.id, { onDelete: 'set null', onUpdate: 'cascade' })
    .notNull(),
  status: text('status').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIndex: sql`CREATE INDEX ON ${table} (user_id)`,
  statusIndex: sql`CREATE INDEX ON ${table} (status)`,
  addressIndex: sql`CREATE INDEX ON ${table} (address_id)`,
  uniqueUserOrder: sql`CREATE UNIQUE INDEX ON ${table} (user_id, status)`,
  totalCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_total CHECK (total >= 0)`,
}));

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id')
    .references(() => orders.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'set null', onUpdate: 'cascade' })
    .notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  quantityCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_quantity CHECK (quantity > 0 AND quantity <= 1000)`,
}));

// Shopping Cart Items Table
export const shoppingCartItems = pgTable('shopping_cart_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  productId: uuid('product_id')
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