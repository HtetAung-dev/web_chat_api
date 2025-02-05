import { ContentType } from "../types/contentType";
import { MessageType } from "../types/messageType";

export class Message implements MessageType {
  public id?: number; // Make id optional
  public room_id: number;
  public sender_id: number;
  public message_content: string;
  public message_type: ContentType;
  public createdAt: string | Date;
  public isRead: boolean;
  public updatedAt: string | Date;
  public isEdited: boolean;
  public isDeleted: boolean;
  public isPinned: boolean;

  constructor(
    room_id: number,
    sender_id: number,
    message_content: string,
    message_type: ContentType,
    createdAt: string | Date,
    isRead: boolean,
    updatedAt: string | Date,
    isEdited: boolean,
    isDeleted: boolean,
    isPinned: boolean,
    id?: number
  ) {
    this.id = id;
    this.room_id = room_id;
    this.sender_id = sender_id;
    this.message_content = message_content;
    this.message_type = message_type;
    this.createdAt = createdAt;
    this.isRead = isRead;
    this.updatedAt = updatedAt;
    this.isEdited = isEdited;
    this.isDeleted = isDeleted;
    this.isPinned = isPinned;
  }

  static fromMessageType(message: MessageType): Message {
    return new Message(
      message.room_id,
      message.sender_id,
      message.message_content,
      message.message_type,
      message.createdAt instanceof Date
        ? message.createdAt.toISOString()
        : message.createdAt,
      message.isRead,
      message.updatedAt instanceof Date
       ? message.updatedAt.toISOString()
       : message.updatedAt,
      message.isEdited,
      message.isDeleted,
      message.isPinned,
      message.id // Pass id if it exists
    );
  }
}
