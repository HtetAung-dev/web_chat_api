import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  index,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    profile_picture_url: text("profile_picture_url"),
    google_id: text("google_id").notNull().default(""),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email),
    providerUserIdIdx: uniqueIndex("google_id_idx").on(table.google_id),
  })
);
