import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('id').primaryKey(),
    email: varchar('email').notNull(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});