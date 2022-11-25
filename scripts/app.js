import { appKey, tokenKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import loginPage from "./pages/login-page.js";
import signupPage from "./pages/signup-page.js";
import tasksPage from "./pages/tasks-page.js";
import STORE from "./store.js";

const router = {
  login: loginPage,
  signup: signupPage,
  tasks: tasksPage,
};

function DoableApp() {
  const token = sessionStorage.getItem(tokenKey)
  const data = localStorage.getItem(appKey)
  // const
  let module;

  try {
    if (!token && !data){
      console.log("LoginPage sin token y data cargada");
      module = loginPage;
    } else {
      console.log("OtherPage not Login desde app.js");
      module = router[STORE.currentPage];
    }
  } catch (error) {
    console.log("LoginPage por error");
    module = loginPage;
  }

  return DOMHandler.load(module(),document.querySelector("#root"));
}

export default DoableApp;
