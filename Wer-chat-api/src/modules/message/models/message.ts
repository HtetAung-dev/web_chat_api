import { ContentType } from "../types/contentType";
import { FlagType } from "../types/flagType";
import { MessageType } from "../types/messageType";

export class Message implements MessageType {
  public id?: number; // Make id optional
  public room_id: number;
  public sender_id: number;
  public message_content: string;
  public message_type: ContentType;
  public createdAt: string | Date;
  public isRead: boolean;
  public flags: {
    isPinned: boolean,
    isEdited: boolean,
    isDeleted: boolean
  };

  constructor(
    room_id: number,
    sender_id: number,
    message_content: string,
    message_type: ContentType,
    createdAt: string | Date,
    flags: {
      isPinned: boolean,
      isEdited: boolean,
      isDeleted: boolean
    },
    isRead: boolean,
    id?: number
  ) {
    this.id = id;
    this.room_id = room_id;
    this.sender_id = sender_id;
    this.message_content = message_content;
    this.message_type = message_type;
    this.createdAt = createdAt;
    this.isRead = isRead;
    this.flags = flags;
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
      message.flags,
      message.isRead,
      message.id // Pass id if it exists
    );
  }
}
