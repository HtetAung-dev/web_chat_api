import { ContentType } from "./contentType";

export type MessageType = {
    id?: number;
    room_id: number;
    sender_id: number;
    message_content: string;
    message_type: ContentType;
    createdAt: string | Date;
    isRead: boolean;
    updatedAt: string | Date;
    isEdited: boolean;
    isDeleted: boolean;
    isPinned: boolean;
  };
  