import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    pgEnum
  } from "drizzle-orm/pg-core";
import { RoomTypes } from "../../modules/chatroom/types/roomTypes";
  
  export const chatroomTable = pgTable(
    "chatrooms",
    {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      type: varchar('type', {length: 25}).$type<RoomTypes>().default('private').notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    (table) => ({
    })
  );
  