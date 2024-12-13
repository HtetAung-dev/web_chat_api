import { RoomTypes } from "./roomTypes";

export type ChatroomType = {
    id?: number;
    name: string;
    type: RoomTypes;
    createdAt: string | Date;
    updatedAt: string | Date;
  };
  