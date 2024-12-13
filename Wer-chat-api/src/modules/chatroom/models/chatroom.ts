import { ChatroomType } from "../types/chatroomType";
import { RoomTypes } from "../types/roomTypes";

export class Chatroom implements ChatroomType {
  public id?: number; // Make id optional
  public name: string;
  public type: RoomTypes;
  public createdAt: string | Date;
  public updatedAt: string | Date;

  constructor(
    name: string,
    type: RoomTypes,    
    createdAt: string | Date,
    updatedAt: string | Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromChatroomType(chatroom: ChatroomType): Chatroom {
    return new Chatroom(
      chatroom.name,
      chatroom.type ?? "",
      chatroom.createdAt instanceof Date
        ? chatroom.createdAt.toISOString()
        : chatroom.createdAt,
      chatroom.updatedAt instanceof Date
        ? chatroom.updatedAt.toISOString()
        : chatroom.updatedAt,
      chatroom.id // Pass id if it exists
    );
  }
}
