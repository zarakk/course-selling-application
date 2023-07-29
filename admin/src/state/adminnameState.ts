import { atom } from "recoil";

type AdminnameType = string;

export const adminnameState = atom<AdminnameType>({
  key: "adminnameState",
  default: "",
});
