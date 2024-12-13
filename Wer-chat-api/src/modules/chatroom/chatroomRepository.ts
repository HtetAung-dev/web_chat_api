import { and, eq, or } from "drizzle-orm";
import { ChatroomType } from "./types/chatroomType";
import { postgresDb } from "../../db/drizzle";
import { chatroomTable, chatRoomUsersTable, usersTable } from "../../db/schema";
import { ChatRoomUserType } from "./types/chatRoomUserType";
import { PermissionType } from "./types/permissionType";
import { RoomUserCreate } from "./types/roomUserCreate";
import { ChatroomUsers } from "./models/chatroomUsers";
import { Chatroom } from "./models/chatroom";

class ChatroomRepository {
  async getChatroom(): Promise<ChatroomType[]> {
    return postgresDb.select().from(chatroomTable);
  }

  async getChatroomUsersById(roomId: number): Promise<object> {
    const result: object = await postgresDb
      .select({
        roomName: chatroomTable.name,
        user: usersTable.name,
        email: usersTable.email,
        permission: chatRoomUsersTable.permission,
        createdAt: chatRoomUsersTable.createdAt,
        updatedAt: chatRoomUsersTable.updatedAt,
      })
      .from(chatRoomUsersTable)
      .innerJoin(chatroomTable, eq(chatroomTable.id, chatRoomUsersTable))
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
      .select()
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
}
export default new ChatroomRepository();
