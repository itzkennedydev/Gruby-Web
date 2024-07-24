import {
    pgTableCreator,
    uuid,
    text,
    timestamp,
    boolean,
    numeric,
    date,
    jsonb,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `synapse_${name}`);

export const clients = createTable("clients", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    contactEmail: text("contact_email"),
    contactPhone: text("contact_phone"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const contracts = createTable("contracts", {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id").references(() => clients.id),
    title: text("title").notNull(),
    content: text("content").notNull(),
    status: text("status").notNull(),
    signedAt: timestamp("signed_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const fileChannels = createTable("file_channels", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    clientId: uuid("client_id").references(() => clients.id),
    projectId: uuid("project_id").references(() => projects.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const files = createTable("files", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    filePath: text("file_path").notNull(),
    fileSize: text("file_size"),
    fileType: text("file_type"),
    channelId: uuid("channel_id").references(() => fileChannels.id),
    uploadedBy: uuid("uploaded_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const formSubmissions = createTable("form_submissions", {
    id: uuid("id").primaryKey().defaultRandom(),
    formId: uuid("form_id").references(() => forms.id),
    submittedBy: uuid("submitted_by").references(() => users.id),
    submissionData: jsonb("submission_data").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const forms = createTable("forms", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const invoices = createTable("invoices", {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id").references(() => clients.id),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    status: text("status").notNull(),
    dueDate: date("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const messages = createTable("messages", {
    id: uuid("id").primaryKey().defaultRandom(),
    senderId: uuid("sender_id").references(() => users.id),
    recipientId: uuid("recipient_id").references(() => users.id),
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = createTable("notifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    content: text("content").notNull(),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at").defaultNow(),
});

export const organizations = createTable("organizations", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = createTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id").references(() => clients.id),
    name: text("name").notNull(),
    description: text("description"),
    status: text("status").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const userPermissions = createTable("user_permissions", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id),
    permission: text("permission").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const users = createTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    fullName: text("full_name"),
    role: text("role").notNull(),
    organizationId: uuid("organization_id").references(() => organizations.id),
    lastSignInAt: timestamp("last_sign_in_at"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});