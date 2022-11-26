import { input } from "../components/input.js";
import DOMHandler from "../dom-handler.js";
import { login } from "../services/sessions-service.js";
import STORE from "../store.js";
import tasksPage from "./tasks-page.js";
import { listTasks } from "../services/tasks-service.js";

function render() {
  const { loginError } = this.state;
  return `
  <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <div class="show-profile-header">
            <h1 class="heading heading--lg text-center mb-2">Icon</h1>
            <a class="text-center block mb-8 js-logout"></a>
        </div>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            name: "email",
            placeholder: "you@example.com",
            type: "email",
            required: true,
            // value: "test1@mail.com",
          })}

          ${input({
            label: "password",
            id: "password",
            name: "password",
            placeholder: "******",
            type: "password",
            required: true,
            // value: "123456",
          })}

          ${
            loginError
              ? `<p class="text-center error-300">${loginError}</p>`
              : ""
          }
          <button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center primary-100 js-signup-link">Create account</a>
      </section>
    </main>
  `;
}

function listenSubmitLogin() {
  console.log("listenSubmit from Login Page");
  const form = document.querySelector(".js-login-form")

  form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const { email, password } = event.target;
    const credentials = {
      email: email.value,
      password: password.value,
    };

    let user;
    console.log(credentials);
    try {
      user = await login(credentials);
      console.log(user);
    } catch (error) {
      console.log("OtherPage not Login desde login-page.js");
      throw new Error(response.statusText);
    }

    STORE.setUser(user);
    STORE.setCurrentPage("tasks");

    const tasks = await listTasks();
    STORE.setTasks(tasks);

    DOMHandler.load(tasksPage(), document.querySelector("#root"));

  })
}

function listenCreateAccount() {
  console.log("listenCreateAccount from Login Page")
}

function loginPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmitLogin();
      listenCreateAccount();
    },
    state: {
      loginError: null,
    }
  }
}

export default loginPage;

