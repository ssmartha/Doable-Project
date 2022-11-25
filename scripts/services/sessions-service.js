// import apiFetch from "./api-fetch/js";
// import apiFetch from "./api-fetch.js";
import apiFetch from "./api-fetch.js";
import { tokenKey, appKey } from "../config.js";

console.log(apiFetch);

export async function login(credentials = { email, password }) {
  const { token, ...user } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);

  return user;
}

export async function logout() {
  localStorage.removeItem(appKey);
  sessionStorage.removeItem(tokenKey);
  // const data = await apiFetch("logout", { method: "DELETE" });

  // return data;
}

