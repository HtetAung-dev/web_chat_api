import {
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
    index,
    integer,
    pgEnum,
    boolean,
    jsonb,
  } from "drizzle-orm/pg-core";
import { ContentType } from "../../modules/message/types/contentType";

  export const messageTable = pgTable(
    "message",
    {
      id: serial("id").primaryKey(),
      room_id: integer("room_id").notNull(),
      sender_id: integer("sender_id").notNull(),
      message_content: text("message_content").notNull(),
      message_type: varchar("message_type", {length: 25}).$type<ContentType>().default('text').notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      isRead: boolean("isRead").default(false).notNull(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
      isEdited: boolean("isEdited").default(false).notNull(),
      isDeleted: boolean("isDeleted").default(false).notNull(),
      isPinned: boolean("isPinned").default(false).notNull()
    },
    (table) => ({
    })
  );
  