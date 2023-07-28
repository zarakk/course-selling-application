import { atom } from "recoil";

type UsernameType = string;

export const usernameState = atom<UsernameType>({
  key: "usernameState",
  default: "",
});
