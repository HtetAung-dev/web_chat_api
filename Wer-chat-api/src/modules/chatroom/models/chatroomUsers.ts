import { ChatRoomUserType } from "../types/chatRoomUserType";
import { PermissionType } from "../types/permissionType";

export class ChatroomUsers implements ChatRoomUserType {
  public id?: number; // Make id optional
  public chatroom_id: number;
  public user_id: number
  public permission: PermissionType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    room_id: number,
    user_id: number,
    permission: PermissionType,    
    createdAt: Date,
    updatedAt: Date,
    id?: number
  ) {
    this.id = id;
    this.chatroom_id = room_id;
    this.user_id = user_id;
    this.permission = permission;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromChatroomUsersType(chatRoomUser: ChatRoomUserType): ChatroomUsers {
    return new ChatroomUsers(
        chatRoomUser.chatroom_id,
      chatRoomUser.user_id,
      chatRoomUser.permission,
      chatRoomUser.createdAt instanceof Date
        ? chatRoomUser.createdAt
        : new Date(chatRoomUser.createdAt),
      chatRoomUser.updatedAt instanceof Date
        ? chatRoomUser.updatedAt
        : new Date(chatRoomUser.updatedAt),
      chatRoomUser.id // Pass id if it exists
    );
  }
}
