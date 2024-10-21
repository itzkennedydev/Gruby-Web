import { pgTable, varchar, timestamp, text, integer, decimal, boolean, date, relations, serial } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { z } from 'zod';

// Users table
export const users = pgTable('users', {
    id: varchar('id', { length: 255 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    role: varchar('role', { length: 50 }).notNull().default('user'),
    profilePicture: text('profile_picture'),
    bio: text('bio'),
    loginCount: integer('login_count').notNull().default(0),
    lastLogin: timestamp('last_login'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Products table
export const products = pgTable('products', {
    id: varchar('id', { length: 255 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    imageUrl: text('image_url'),
    chefId: varchar('chef_id', { length: 255 }).notNull(),
    isAvailable: boolean('is_available').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Orders table
export const orders = pgTable('orders', {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('pending'),
    totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
    deliveryAddress: text('delivery_address'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
    id: varchar('id', { length: 255 }).primaryKey(),
    orderId: varchar('order_id', { length: 255 }).notNull(),
    productId: varchar('product_id', { length: 255 }).notNull(),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    productId: varchar('product_id', { length: 255 }).notNull(),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Chefs table
export const chefs = pgTable('chefs', {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    specialty: text("specialty").notNull(),
    imageUrl: text("image_url").notNull(),
    rating: integer("rating").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Dishes table
export const dishes = pgTable("dishes", {
  id: serial("id").primaryKey(),
  chefId: integer("chef_id").references(() => chefs.id).notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Define types for valid roles and order statuses
export const UserRole = z.enum(['user', 'admin', 'chef']);
export type UserRole = z.infer<typeof UserRole>;

export const OrderStatus = z.enum(['pending', 'processing', 'completed', 'cancelled']);
export type OrderStatus = z.infer<typeof OrderStatus>;

// Zod schemas for inserting new records
export const insertUserSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    role: UserRole.default('user'),
    profilePicture: z.string().url().optional(),
    bio: z.string().max(500).optional(),
});

export const insertProductSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().optional(),
    price: z.number().positive(),
    imageUrl: z.string().url().optional(),
    chefId: z.string(),
    isAvailable: z.boolean().default(true),
});

export const insertOrderSchema = z.object({
    userId: z.string(),
    status: OrderStatus.default('pending'),
    totalAmount: z.number().positive(),
    deliveryAddress: z.string(),
});

export const insertOrderItemSchema = z.object({
    orderId: z.string(),
    productId: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().positive(),
});

export const insertReviewSchema = z.object({
    userId: z.string(),
    productId: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
});

export const insertChefSchema = z.object({
    userId: z.string(),
    speciality: z.string().max(100).optional(),
    yearsOfExperience: z.number().int().nonnegative().optional(),
    availableFrom: z.date().optional(),
    availableTo: z.date().optional(),
});

// Infer types from tables
export type User = InferModel<typeof users>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type Product = InferModel<typeof products>;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type Order = InferModel<typeof orders>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type OrderItem = InferModel<typeof orderItems>;
export type NewOrderItem = z.infer<typeof insertOrderItemSchema>;
export type Review = InferModel<typeof reviews>;
export type NewReview = z.infer<typeof insertReviewSchema>;
export type Chef = InferModel<typeof chefs>;
export type NewChef = z.infer<typeof insertChefSchema>;

// Type guard functions
export function isValidUserRole(role: string): role is UserRole {
    return UserRole.safeParse(role).success;
}

export function isValidOrderStatus(status: string): status is OrderStatus {
    return OrderStatus.safeParse(status).success;
}

// Define relationships
export const usersRelations = relations(users, ({ many, one }) => ({
    orders: many(orders),
    reviews: many(reviews),
    chef: one(chefs, {
        fields: [users.id],
        references: [chefs.userId],
    }),
}));

export const productsRelations = relations(products, ({ many, one }) => ({
    orderItems: many(orderItems),
    reviews: many(reviews),
    chef: one(chefs, {
        fields: [products.chefId],
        references: [chefs.id],
    }),
}));

export const ordersRelations = relations(orders, ({ many, one }) => ({
    user: one(users, {
        fields: [orders.userId],
        references: [users.id],
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

export const reviewsRelations = relations(reviews, ({ one }) => ({
    user: one(users, {
        fields: [reviews.userId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [reviews.productId],
        references: [products.id],
    }),
}));

export const chefsRelations = relations(chefs, ({ one, many }) => ({
    user: one(users, {
        fields: [chefs.userId],
        references: [users.id],
    }),
    products: many(products),
}));
