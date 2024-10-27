import { pgTable, uuid, text, timestamp, integer, decimal } from 'drizzle-orm/pg-core';
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

// Products Table with price constraints and composite unique index
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
  chefIndex: sql`CREATE INDEX ON ${table} (chef_id)`, // Add index for chefId
  uniqueProduct: sql`CREATE UNIQUE INDEX ON ${table} (name, chef_id)`, // Composite unique index on name and chefId
  priceCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_price CHECK (price >= 0.01 AND price <= 10000)`, // Price validation constraint
}));

// Orders Table with composite unique index on userId and status
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull(),
  status: text('status').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userIndex: sql`CREATE INDEX ON ${table} (user_id)`, // Index on userId
  statusIndex: sql`CREATE INDEX ON ${table} (status)`, // Index on status
  uniqueUserOrder: sql`CREATE UNIQUE INDEX ON ${table} (user_id, status)`, // Composite unique index for user and status
  totalCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_total CHECK (total >= 0)`, // Ensure total is non-negative
}));

// Order Items Table with foreign key references and quantity constraints
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
  quantityCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_quantity CHECK (quantity > 0 AND quantity <= 1000)`, // Ensure quantity is valid
}));

// Shopping Cart Items Table with composite unique index on userId and productId
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
  uniqueCartItem: sql`CREATE UNIQUE INDEX ON ${table} (user_id, product_id)`, // Composite unique index for user and product in cart
  cartQuantityCheck: sql`ALTER TABLE ${table} ADD CONSTRAINT check_cart_quantity CHECK (quantity > 0 AND quantity <= 100)`, // Check for valid cart quantity
}));

// PostgreSQL trigger to automatically update the `updatedAt` field on row updates
export const createUpdatedAtTrigger = (tableName: string) => sql`
  CREATE TRIGGER update_${tableName}_updated_at
  BEFORE UPDATE ON ${tableName}
  FOR EACH ROW EXECUTE PROCEDURE trigger_set_updated_at();
`;

// Trigger function for `updatedAt` field
export const createTriggerFunction = () => sql`
  CREATE OR REPLACE FUNCTION trigger_set_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
`;
