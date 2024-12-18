import { and, count, desc, eq, inArray, or, sql } from "drizzle-orm";
import { ChatroomType } from "./types/chatroomType";
import { postgresDb } from "../../db/drizzle";
import {
  chatroomTable,
  chatRoomUsersTable,
  messageTable,
  usersTable,
} from "../../db/schema";
import { ChatRoomUserType } from "./types/chatRoomUserType";
import { PermissionType } from "./types/permissionType";
import { RoomUserCreate } from "./types/roomUserCreate";
import { ChatroomUsers } from "./models/chatroomUsers";
import { Chatroom } from "./models/chatroom";
import { UserType } from "../user/types/userType";
import { permission } from "process";

class ChatroomRepository {
  async getChatroom(): Promise<ChatroomType[]> {
    return postgresDb.select().from(chatroomTable);
  }

  async checkExistChat(senderId: number, receiverId: number): Promise<any> {
    const existingChatroom = await postgresDb
      .select({ 
        id: chatRoomUsersTable.chatroom_id,
        name: chatroomTable.name,
        type: chatroomTable.type,
        createdAt: chatroomTable.createdAt,
        updatedAt: chatroomTable.updatedAt,
       })
      .from(chatRoomUsersTable)
      .innerJoin(
        chatroomTable,
        eq(chatroomTable.id, chatRoomUsersTable.chatroom_id)
      )
      .where(
        and(
          eq(chatroomTable.type, "private"), // Check for private chatrooms
          inArray(chatRoomUsersTable.user_id, [senderId, receiverId]) // Check if both users exist in the chatroom
        )
      )
      .groupBy(chatRoomUsersTable.chatroom_id, chatroomTable.name, chatroomTable.type, chatroomTable.createdAt, chatroomTable.updatedAt) // Group by chatroom ID
      .having(eq(sql<number>`COUNT(DISTINCT ${chatRoomUsersTable.user_id})`, 2)) // Ensure both users exist in the chatroom
      .limit(1);

    return existingChatroom.length > 0 ? existingChatroom[0] : null;
  }

  async getChatroomUsersById(roomId: number): Promise<any> {
    const result: any = await postgresDb
      .select({
        id: usersTable.id,
        user: usersTable.name,
        email: usersTable.email,
        permission: chatRoomUsersTable.permission,
        createdAt: chatRoomUsersTable.createdAt,
      })
      .from(chatRoomUsersTable)
      .innerJoin(
        chatroomTable,
        eq(chatroomTable.id, chatRoomUsersTable.chatroom_id)
      )
      .innerJoin(usersTable, eq(chatRoomUsersTable.user_id, usersTable.id))
      .where(and(eq(chatRoomUsersTable.chatroom_id, roomId)));
    return result;
  }

  async createChatroom(chatroom: ChatroomType): Promise<ChatroomType> {
    const result: ChatroomType[] = await postgresDb
      .insert(chatroomTable)
      .values({
        name: chatroom.name,
        type: chatroom.type,
        createdAt: new Date(chatroom.createdAt),
        updatedAt: new Date(chatroom.updatedAt),
      })
      .returning();
    return result[0];
  }

  async joinChatroomUsers(
    roomId: number,
    userId: number,
    permission: PermissionType
  ): Promise<ChatRoomUserType> {
    const result: ChatRoomUserType[] = await postgresDb
      .insert(chatRoomUsersTable)
      .values({
        chatroom_id: roomId,
        user_id: userId,
        permission: permission,
      })
      .returning();
    return result[0];
  }

  async addUsersToChatroom(
    chatroomUsers: ChatroomUsers[]
  ): Promise<ChatRoomUserType[]> {
    const result: ChatRoomUserType[] = await postgresDb
      .insert(chatRoomUsersTable)
      .values(chatroomUsers)
      .returning();
    return result;
  }

  async getChatroomById(chatroomId: number): Promise<ChatroomType | null> {
    const result = await postgresDb
      .select({
        chatoom_id: chatroomTable.id,
        name: chatroomTable.name,
        type: chatroomTable.type,
        createdAt: chatroomTable.createdAt,
        updatedAt: chatroomTable.updatedAt,
        participants: sql<[]>`
        CASE
          WHEN chatroomTable.type = 'group' THEN (
          SELECT (${usersTable.id} as user_id, ${usersTable.name} as user_name, ${chatRoomUsersTable.permission} as permission)
          FROM ${chatRoomUsersTable}
          JOIN ${usersTable} ON ${chatRoomUsersTable.user_id} = ${usersTable.id}
          WHERE ${chatRoomUsersTable.chatroom_id} = ${chatroomId}
          )
          ELSE NULL
        `,
      })
      .from(chatroomTable)
      .where(eq(chatroomTable.id, chatroomId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  }

  async getChatroomByUser(userId: number): Promise<ChatRoomUserType[]> {
    const result: ChatRoomUserType[] = await postgresDb
      .select()
      .from(chatRoomUsersTable)
      .where(eq(chatRoomUsersTable.user_id, userId));
    return result;
  }

  async getChatroomDetail(
    roomId: number
  ): Promise<any> {
    const chatroom = await postgresDb
      .select({
        chatroom_id: chatroomTable.id,
        name: chatroomTable.name,
        chatroomType: chatroomTable.type,
        lastMessage: messageTable.message_content,
        isRead: messageTable.isRead,
        lastMessageTime: messageTable.createdAt,
        participants: sql`
        (
          
          SELECT JSON_AGG(JSON_BUILD_OBJECT( 'id', ${usersTable.id}, 'name', ${usersTable.name}, 'profile_url', ${usersTable.profile_picture_url}, 'role', ${chatRoomUsersTable.permission} ))
          FROM ${usersTable} 
          JOIN ${chatRoomUsersTable} 
          ON ${chatRoomUsersTable.user_id} = ${usersTable.id} 
          WHERE ${chatRoomUsersTable.chatroom_id} = ${chatroomTable.id}
          )
        `,
      })
      .from(chatroomTable)
      .leftJoin(
        messageTable,
        and(
          eq(chatroomTable.id, messageTable.room_id), // Join messages with chatrooms
          sql`${messageTable.createdAt} = (
          SELECT MAX(${messageTable.createdAt})
          FROM ${messageTable}
          WHERE ${messageTable.room_id} = ${chatroomTable.id}
        )`
        )
      )
      .where(
        sql`${chatroomTable.id} IN (
          SELECT ${chatRoomUsersTable.chatroom_id}
          FROM ${chatRoomUsersTable}
          WHERE ${chatRoomUsersTable.chatroom_id} = ${roomId}
        )`
      )
      .limit(1);

      console.log(chatroom)

    return chatroom[0];
  }

  async getUserChatrooms(
    userId: number,
    limit: number,
    page: number
  ): Promise<any> {
    const chatrooms = await postgresDb
      .select({
        chatroom_id: chatroomTable.id,
        name: chatroomTable.name,
        chatroomType: chatroomTable.type,
        lastMessage: messageTable.message_content,
        isRead: messageTable.isRead,
        lastMessageTime: messageTable.createdAt,
        participants: sql`
        (
          
          SELECT JSON_AGG(JSON_BUILD_OBJECT( 'id', ${usersTable.id}, 'name', ${usersTable.name}, 'profile_url', ${usersTable.profile_picture_url}, 'role', ${chatRoomUsersTable.permission} ))
          FROM ${usersTable} 
          JOIN ${chatRoomUsersTable} 
          ON ${chatRoomUsersTable.user_id} = ${usersTable.id} 
          WHERE ${chatRoomUsersTable.chatroom_id} = ${chatroomTable.id}
          )
        `,
      })
      .from(chatroomTable)
      .leftJoin(
        messageTable,
        and(
          eq(chatroomTable.id, messageTable.room_id), // Join messages with chatrooms
          sql`${messageTable.createdAt} = (
          SELECT MAX(${messageTable.createdAt})
          FROM ${messageTable}
          WHERE ${messageTable.room_id} = ${chatroomTable.id}
        )`
        )
      )
      .where(
        sql`${chatroomTable.id} IN (
          SELECT ${chatRoomUsersTable.chatroom_id}
          FROM ${chatRoomUsersTable}
          WHERE ${chatRoomUsersTable.user_id} = ${userId}
        )`
      )
      .orderBy(desc(messageTable.createdAt)) // Sort by the last message time
      .limit(Number.parseInt(limit.toString()))
      .offset(Number.parseInt(((page - 1) * limit).toString()));

    return chatrooms;
  }

  async getUserPermission(roomId: number, userId: number): Promise<ChatRoomUserType | null>{
    const result: ChatRoomUserType[] = await postgresDb.select().from(chatRoomUsersTable).where(and(eq(chatRoomUsersTable.chatroom_id,roomId),eq(chatRoomUsersTable, userId)));
    return result.length > 0? result[0] : null;
  }

  async updateChatroom(name: string, roomId: number): Promise<ChatroomType>{
    const result: ChatroomType[] = await postgresDb.update(chatroomTable).set({name: name, updatedAt: new Date()}).where(eq(chatroomTable.id, roomId)).returning();
    return result[0];
  }
}
export default new ChatroomRepository();
