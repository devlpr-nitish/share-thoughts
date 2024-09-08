import { atom } from "recoil";

export const showProfileMenu = atom({
  key: "showProfileMenu",
  default: false,
});

export const profileIconRef = atom({
  key: "profileIconRef",
  default: null,
});
