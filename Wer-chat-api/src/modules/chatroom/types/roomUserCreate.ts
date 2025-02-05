import { PermissionType } from "./permissionType";
import { RoomTypes } from "./roomTypes";

export type RoomUserCreate = {
    id?: number;
    chatroom_id: number;
    user_id: number;
    permission: PermissionType;
    createdAt: Date;
    updatedAt: Date;
  };
  