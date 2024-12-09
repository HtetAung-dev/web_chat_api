import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
    index,
  } from "drizzle-orm/pg-core";
  
  export const chatroomTable = pgTable(
    "chatrooms",
    {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
    })
  );
  