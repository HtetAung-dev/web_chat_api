import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  index,
  pgEnum,
  integer,
} from "drizzle-orm/pg-core";
import { PermissionType } from "../../modules/chatroom/types/permissionType";


export const chatRoomUsersTable = pgTable(
  "chatroom_users",
  {
    id: serial("id").primaryKey(),
    chatroom_id: integer("chatroom_id").notNull(),
    user_id: integer("user_id").notNull(),    
    permission: varchar('permission', {length: 25}).$type<PermissionType>().default('member').notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
  })
);
