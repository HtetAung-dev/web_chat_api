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
  
  export const message = pgTable(
    "users",
    {
      id: serial("id").primaryKey(),
      room_id: integer("name").notNull(),
      sender_id: integer("sender_id").notNull(),
      message_content: text("message_content"),
      message_type: text("message_type").notNull().default(""),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      isRead: timestamp("updated_at").notNull().defaultNow(),
      flags: text("flags")
    },
    (table) => ({
    })
  );
  