import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

// user table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// notes table
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),

  title: text("title").notNull().default("Untitled"),

  content: text("content").notNull().default(""),

  userId: text("user_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
