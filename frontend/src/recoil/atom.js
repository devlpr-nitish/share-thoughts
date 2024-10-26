import { atom } from "recoil";

// Auth state to store user data and token
export const authState = atom({
  key: "authState",
  default: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
});

// Validation state to store any form errors
export const validationState = atom({
  key: "validationState",
  default: {
    emailEorr: "",
    passwordError: "",
  },
});
