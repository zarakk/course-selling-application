import { atom } from "recoil";
interface Message {
  user: string;
  text: string;
}

export const messagesState = atom<Message[]>({
  key: "messagesState",
  default: [],
});
