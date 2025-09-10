import { getBrowserLanguage } from "./language";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const redirectLogin = () => {
  window.location.href = `${URL_BACKEND}/api/auth/google?lang=${getBrowserLanguage()}`;
};

export const redirectLogout = () => {
  window.location.href = `${URL_BACKEND}/api/auth/logout`;
};

export const isLoggedIn = () => {
  if (typeof window == "undefined") return;
  return localStorage.getItem("isLoggedIn") === "true";
};

export const setLoggedIn = (value) => {
  if (typeof window == "undefined") return;
  localStorage.setItem("isLoggedIn", value ? "true" : "false");
};
