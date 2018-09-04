import { MessageType } from "./MessageType";

export interface Message {
  name: string;
  data: string;
  type: MessageType;
  userId: string;
}