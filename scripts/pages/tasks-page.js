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
  console.log(task);
  return `
    <div class="task js-task flex" data-taskId="${task.id}">
      <icon data-id="${task.id}" class="ri-checkbox-fill js-completed-icon
      ${task.completed == true ? "primary-100" : "gray-200"}">
      </icon>
      <div>
        <p>${task.title}</p>
        <p>${task.due_date}</p>
      </div>
      <icon data-id="${task.id}" class="ri-error-warning-fill js-important-icon
      ${task.important == true ? "primary-100" : "gray-200"}
      ${task.completed == true && task.important == true ? "primary-200" : ""}">
      </icon>
    </div>
  `;
}

function render() {
  console.log("inside render!!!");
  // STORE.fetchTasks;
  const tasksList = STORE.tasks;

  // console.log(STORE);
  // console.log(STORE.tasks);
  // console.log(tasksList);
  return `
    <main class="section">
        <section class="container">
          <header class="header">
            <img src="/assets/images/doable-logo.png" alt="doable logo"/>
            <a class="text-center block mb-0 js-logout">Logout</a>
          </header>
          <form class="flex flex-column gap-4 mb-4 js-login-form">
           <div>
            <label class="content-xs overline"> Sort </label>

            <select class="form-select" aria-label="Default select example" name="filter" id="filter">
                <option disabled selected hidden>Select an option</option>
                <option value="Acquaintance" id="relation"}>Acquaintance</option>
                <option value="Alphabetical (a-z)" id="relation"}>Alphabetical (a-z)</option>
                <option value="Due date" id="relation"}>Due date</option>
            </select>
           </div>
           <div>
            <label class="content-xs overline"> Show </label>

            <input type="checkbox" id="pending-tasks" class="content-xs overline"/>
            <label for="pending-tasks" class="content-xs overline js-pending-filter"> Only pending </label>

            <input type="checkbox" id="important-tasks" class="content-xs overline"/>
            <label for="important-tasks" class="content-xs overline js-important-filter"> Only important </label>
           </div>

           <div class="task-list js-list-container"
           data-listName="tasks-barcelona">
           ${tasksList.map(renderTask).join("")}
           </div>

          ${input({
            id: "new task",
            name: "new task",
            placeholder: "do the dishes...",
            type: "text",
            required: true,
            // value: "test1@mail.com",
          })}

          ${input({
            id: "due date",
            name: "due date",
            placeholder: "******",
            type: "date",
            required: true,
            // value: "123456",
          })}

          <button class="button button--primary js-submit-newtask"> Add Task </button>
        </form>
      </section>
    </main>
        `;
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
