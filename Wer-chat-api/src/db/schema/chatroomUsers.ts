import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  index,
  integer,
} from "drizzle-orm/pg-core";

export const chatroom_users = pgTable(
  "chatroom_users",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull(),
    chatroom_id: integer("chatroom_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
  })
);
