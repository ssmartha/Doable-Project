import { input } from "../components/input.js"
import { logout } from "../services/sessions-service.js";
import loginPage from "./login-page.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { listTasks, createTask, editTask, importantTask, completedTask, deleteTask } from "../services/tasks-service.js";
// import { login } from "../services/sessions-service.js"

// async function loadTasks(){
//   let tasks = await listTasks();
//   STORE.setTasks(tasks);
//   console.log(STORE);
// }

// loadTasks().then(console.log)

function renderTask(task) {
  console.log("inside render task!!!");
  console.log(STORE);
  console.log(STORE.tasks);
  console.log(task);
  return `
    <div class="task js-task" data-taskId="${task.id}">
      <img
        src="/assets/icons/check.svg"
        alt="check"
        class="js-task-check"
      />
      <div>
        <p>${task.title}</p>
        <p>${task.due_date}</p>
      </div>
      <img
        src="/assets/icons/important.svg"
        alt="important"
        class="js-task-important"
      />

    </div>
  `;
}

function render() {
  console.log("inside render!!!");
  STORE.fetchTasks;
  const tasksList = STORE.tasks;

  console.log(STORE);
  console.log(STORE.tasks);
  console.log(tasksList);
  return `
    <header class="">
      <img src="/assets/images/doable-logo.png" alt="doable logo" />
      <a class="text-center block mb-8 js-logout">Logout</a>
    </header>
    <div
      class="task-list js-list-container"
      data-listName="tasks-barcelona"
    >
      ${tasksList.map(renderTask).join("")}
    </div>
        `
  // const { loginError } = this.state;
  // return `
  // <main class="section">
  //     <section class="container">
  //       <h1 class="heading heading--lg text-center mb-4">Login</h1>
  //       <form class="flex flex-column gap-4 mb-4 js-login-form">

  //         ${input({
  //           label: "email",
  //           id: "email",
  //           name: "email",
  //           placeholder: "you@example.com",
  //           type: "email",
  //           required: true,
  //           // value: "test1@mail.com",
  //         })}

  //         ${input({
  //           label: "password",
  //           id: "password",
  //           name: "password",
  //           placeholder: "******",
  //           type: "password",
  //           required: true,
  //           // value: "123456",
  //         })}

  //         ${
  //           loginError
  //             ? `<p class="text-center error-300">${loginError}</p>`
  //             : ""
  //         }
  //         <button class="button button--primary">Login</button>
  //       </form>
  //       <a href="#" class="block text-center primary-100 js-signup-link">Create account</a>
  //     </section>
  //   </main>
  // `;
}

function listenSubmitLogin() {
  console.log("listenSubmit from Tasks Page");
  // const form = document.querySelector(".js-login-form")

  // form.addEventListener("submit", async(event) => {
  //   event.preventDefault();

  //   const { email, password } = event.target;
  //   const credentials = {
  //     email: email.value,
  //     password: password.value,
  //   };

  //   console.log(credentials);
  //   try {
  //     const user = await login(credentials);
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error);
  //   }


  // })
}

function listenCreateAccount() {
  console.log("listenCreateAccount from Tasks Page")
}

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async(event) => {
    event.preventDefault();

    try {
      await logout();
      DOMHandler.load(loginPage(),document.querySelector("#root"));
    } catch (error) {
      console.log(error);
    }
  });
}

function tasksPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmitLogin();
      listenCreateAccount();
      listenLogout();
    },
    state: {
      loginError: null,
    }
  }
}

export default tasksPage;
