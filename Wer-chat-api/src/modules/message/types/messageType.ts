import { ContentType } from "./contentType";
import { FlagType } from "./flagType";

export type MessageType = {
    id?: number;
    room_id: number;
    sender_id: number;
    message_content: string;
    message_type: ContentType;
    createdAt: string | Date;
    isRead: boolean;
    flags: FlagType;
  };
  