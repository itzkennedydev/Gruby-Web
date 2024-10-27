import { pgTable, uuid, text, timestamp, unique, serial, decimal, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { InferModel } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(), // Optional unique internal ID
  user_id: text('user_id').notNull().unique(), // Clerk user ID must be unique and not null
  email: text('email').notNull().unique(),     // User email must be unique
  name: text('name'),                          // Optional user name
  avatarUrl: text('avatar_url'),               // Optional user avatar
  createdAt: timestamp('created_at').defaultNow().notNull(), // Timestamps
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Chefs table
export const chefs = pgTable('chefs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  coverImageUrl: text('cover_image_url'),
  specialty: text('specialty').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  chefId: text('chef_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: text('user_id').notNull(),
  status: text('status').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const chefsRelations = relations(chefs, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  chef: one(chefs, {
    fields: [products.chefId],
    references: [chefs.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.user_id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

// Infer types from tables
export type User = InferModel<typeof users>;
export type Chef = InferModel<typeof chefs>;
export type Product = InferModel<typeof products>;
export type Order = InferModel<typeof orders>;
export type OrderItem = InferModel<typeof orderItems>;
