import { pgTable, foreignKey, serial, integer, numeric, uuid, text, timestamp, unique } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const orderItems = pgTable("order_items", {
	id: serial().primaryKey().notNull(),
	orderId: integer("order_id").notNull(),
	productId: integer("product_id").notNull(),
	quantity: integer().notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
},
(table) => {
	return {
		orderItemsOrderIdOrdersIdFk: foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_items_order_id_orders_id_fk"
		}),
		orderItemsProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "order_items_product_id_products_id_fk"
		}),
	}
});

export const homeCooks = pgTable("home_cooks", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	bio: text(),
	avatarUrl: text("avatar_url"),
	coverImageUrl: text("cover_image_url"),
	cuisine: text().notNull(),
	experience: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	stripeAccountId: text("stripe_account_id"),
	stripeAccountStatus: text("stripe_account_status"),
	onboardingCompleted: text("onboarding_completed").default('false').notNull(),
	businessName: text("business_name"),
	businessType: text("business_type"),
});

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	email: text().notNull(),
	name: text(),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		usersUserIdUnique: unique("users_user_id_unique").on(table.userId),
		usersEmailUnique: unique("users_email_unique").on(table.email),
	}
});

export const orders = pgTable("orders", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	status: text().notNull(),
	total: numeric({ precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	imageUrl: text("image_url"),
	homeCookId: uuid("home_cook_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		productsHomeCookIdHomeCooksIdFk: foreignKey({
			columns: [table.homeCookId],
			foreignColumns: [homeCooks.id],
			name: "products_home_cook_id_home_cooks_id_fk"
		}),
	}
});
