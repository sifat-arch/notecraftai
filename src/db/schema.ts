// import {
//   integer,
//   pgTable,
//   varchar,
//   text,
//   timestamp,
//   serial,
// } from "drizzle-orm/pg-core";

// export const notes = pgTable("notes", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: text("user_id").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
// });

import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  content: text("content").notNull(),

  userId: text("user_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
