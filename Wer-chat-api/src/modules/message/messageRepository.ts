import { and, desc, eq, or } from 'drizzle-orm';
import { MessageType } from './types/messageType';
import { postgresDb } from "../../db/drizzle";
import { messageTable } from "../../db/schema";

class MessageRepository {
  async getChatroomMessage(chatroomId: number, limit: number, page: number): Promise<MessageType[]> {
    return await postgresDb.select().from(messageTable).where(eq(messageTable.room_id, Number.parseInt(chatroomId.toString()))).orderBy(desc(messageTable.createdAt)).offset((page -1 ) * limit).limit(Number.parseInt(limit.toString()));
  }

  async createMessage(message: MessageType): Promise<MessageType> {
    console.log("to create message", message);
    const result: MessageType[] = await postgresDb
      .insert(messageTable)
      .values({
        room_id: message.room_id,
        sender_id: message.sender_id,
        message_content: message.message_content,
        message_type: message.message_type,
        createdAt: message.createdAt as Date,
        isRead: message.isRead,
        updatedAt: message.updatedAt as Date,
        isEdited: message.isEdited,
        isDeleted: message.isDeleted,
        isPinned: message.isPinned
      })
      .returning();
    return result[0];
  }

  async getMessageById(messageId: number): Promise<MessageType | null> {
    const result = await postgresDb.select().from(messageTable).where(eq(messageTable.id,messageId)).limit(1);
    return result.length > 0 ? result[0] : null;
  }

  async readMessage(messageId: number): Promise<MessageType | null> {
    const result: MessageType[] = await postgresDb
     .update(messageTable)
     .set({
        isRead: true,
      })
     .where(eq(messageTable.id, messageId))
     .returning();
    return result[0];
  }
  
  async editMessage(
    messageId: number,
    message: string
  ): Promise<MessageType | null> {
    const result: MessageType[] = await postgresDb
      .update(messageTable)
      .set({
        isEdited: true,
        message_content: message,
        updatedAt: new Date(),
      })
      .where(eq(messageTable.id, messageId))
      .returning();
    return result[0];
  }
}
export default new MessageRepository();
