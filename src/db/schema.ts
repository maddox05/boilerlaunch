import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

// Products table
export const products = pgTable("boilerlaunch_products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull().unique(),
  shortDescription: text("short_description").notNull(),
  imageUrl: text("image_url").notNull(),
  projectUrl: text("project_url").notNull().unique(),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: uuid("user_id").notNull(), // References auth.users.id from Supabase
});

// Upvotes table
export const upvotes = pgTable("boilerlaunch_upvotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  userId: uuid("user_id").notNull(), // References auth.users.id from Supabase
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  upvotes: many(upvotes),
}));

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  product: one(products, {
    fields: [upvotes.productId],
    references: [products.id],
  }),
}));

// Type exports
export type Product = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;
export type Upvote = InferSelectModel<typeof upvotes>;
export type NewUpvote = InferInsertModel<typeof upvotes>;
