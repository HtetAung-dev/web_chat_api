import { and, eq, or } from 'drizzle-orm';
import { MessageType } from './types/messageType';
import { postgresDb } from "../../db/drizzle";
import { messageTable } from "../../db/schema";

class MessageRepository {
  async getChatroomMessage(chatroomId: number): Promise<MessageType[]> {
    return postgresDb.select().from(messageTable).where(eq(messageTable.room_id, chatroomId));
  }

  async createMessage(message: MessageType): Promise<MessageType> {
    const result: MessageType[] = await postgresDb
      .insert(messageTable)
      .values({
        room_id: message.room_id,
        sender_id: message.sender_id,
        message_content: message.message_content,
        message_type: message.message_type,
        createdAt: new Date(message.createdAt),
        isRead: message.isRead,
        flags: message.flags,
      })
      .returning();
    return result[0];
  }

  async getMessageById(messageId: number): Promise<MessageType | null> {
    const result = await postgresDb.select().from(messageTable).where(eq(messageTable.id,messageId)).limit(1);
    return result.length > 0 ? result[0] : null;
  }
}
export default new MessageRepository();
