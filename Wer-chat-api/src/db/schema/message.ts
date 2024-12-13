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
  } from "drizzle-orm/pg-core";
import { ContentType } from "../../modules/message/types/contentType";
import { FlagType } from "../../modules/message/types/flagType";

  export const messageTable = pgTable(
    "message",
    {
      id: serial("id").primaryKey(),
      room_id: integer("name").notNull(),
      sender_id: integer("sender_id").notNull(),
      message_content: text("message_content").notNull(),
      message_type: varchar("message_type", {length: 25}).$type<ContentType>().default('text').notNull(),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      isRead: boolean("isRead").default(false).notNull(),
      flags: varchar("flags", {length: 25}).$type<FlagType>().default('normal').notNull(),
    },
    (table) => ({
    })
  );
  