import { tokenKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import loginPage from "../pages/login-page.js";

// const

function DoableApp() {
  const token = localStorage.getItem(tokenKey)
  let module;

  if (!token) {
    console.log("LoginPage");
    module = loginPage
  } else {
    console.log("TaskPage");
    module = TasksPage
  }

  return DOMHandler.load(module(),document.querySelector("#root"));
}

export default DoableApp;
