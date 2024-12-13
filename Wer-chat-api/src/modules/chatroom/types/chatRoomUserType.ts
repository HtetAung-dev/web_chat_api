import { PermissionType } from "./permissionType";
import { RoomTypes } from "./roomTypes";

export type ChatRoomUserType = {
    id?: number;
    chatroom_id: number;
    user_id: number;
    permission: PermissionType;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
  