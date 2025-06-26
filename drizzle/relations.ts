import { relations } from "drizzle-orm/relations";
import { orders, orderItems, products, homeCooks } from "./schema";

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	}),
}));

export const ordersRelations = relations(orders, ({many}) => ({
	orderItems: many(orderItems),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	orderItems: many(orderItems),
	homeCook: one(homeCooks, {
		fields: [products.homeCookId],
		references: [homeCooks.id]
	}),
}));

export const homeCooksRelations = relations(homeCooks, ({many}) => ({
	products: many(products),
}));