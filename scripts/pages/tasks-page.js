import { input } from "../components/input.js"
import { logout } from "../services/sessions-service.js";
import loginPage from "./login-page.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { saveToLocalStorage } from "../utils.js";
import { listTasks, getTask, createTask, editTask, importantTask, completedTask, deleteTask } from "../services/tasks-service.js";
// import { login } from "../services/sessions-service.js"

// async function loadTasks(){
//   let tasks = await listTasks();
//   STORE.setTasks(tasks);
//   console.log(STORE);
// }

// loadTasks().then(console.log)

function renderTask(task) {
  console.log("inside render task!!!");
  // console.log(task);
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
      ${task.important == false ? "gray-200": ""}
      ${task.completed == true ? "primary-200" : "primary-100"}">
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
          <form class="flex flex-column gap-4 mb-4 js-tasks-form">
           <div>
            <label class="content-xs overline"> Sort </label>

            <select class="form-select" aria-label="Default select example" name="filter" id="filter">
                <option disabled selected hidden>Select an option</option>
                <option value="Alphabetical (a-z)" id="relation"}>Alphabetical (a-z)</option>
                <option value="Due date" id="relation"}>Due date</option>
                <option value="Importance" id="relation"}>Importance</option>
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
            id: "title",
            name: "title",
            placeholder: "do the dishes...",
            type: "text",
            required: true,
            // value: "test1@mail.com",
          })}

          ${input({
            id: "date",
            name: "date",
            pattern:  "((0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4})",
            placeholder: "dd/mm/aaaa",
            type: "text",
            required: true,
            // value: "dd/mm/aaaa",
          })}

          <button class="button button--primary js-submit-newtask"> Add Task </button>
        </form>
      </section>
    </main>
        `;
}

function addNewTaskListener() {
  console.log("addNewTaskListener from Tasks Page");

  const form = document.querySelector(".js-tasks-form")

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      console.log(event.target.elements);
      const { title, date  } = event.target.elements;

      const newTask = {
        title: title.value,
        due_date: date.value,
      }

      console.log(newTask);
      const createdTask = await createTask(newTask);
      STORE.addTask(createdTask);
      console.log(STORE);

      DOMHandler.load(tasksPage(), document.querySelector("#root"));

    } catch (error) {
      console.log(error);
    }
  })
}

function importantTaskListener() {
  console.log("importantTaskListener from Tasks Page");

  const icons = document.querySelectorAll(".js-important-icon");

  icons.forEach((icon)=> {
    icon.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        console.log(event.target.dataset.id);
        const id = event.target.dataset.id;
        console.log(id);

        const taskOfIconSelected = await getTask(id);
        console.log(taskOfIconSelected);
        console.log(taskOfIconSelected.important);

        const newImportantStatus = {
          title: taskOfIconSelected.title,
          due_date: taskOfIconSelected.due_date,
          important: !taskOfIconSelected.important,
          completed: taskOfIconSelected.completed
        }

        const updatedTask = await editTask(newImportantStatus, id);

        const tasks = await listTasks();
        STORE.setTasks(tasks);

        DOMHandler.load(tasksPage(), document.querySelector("#root"));

      } catch (error) {
        console.log(error);
      }
    })

  })
}

function completedTaskListener() {
  console.log("completedTaskListener from Tasks Page");

  const icons = document.querySelectorAll(".js-completed-icon");

  icons.forEach((icon)=> {
    icon.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        console.log(event.target.dataset.id);
        const id = event.target.dataset.id;
        console.log(id);

        const taskOfIconSelected = await getTask(id);

        const newCompletedStatus = {
          title: taskOfIconSelected.title,
          due_date: taskOfIconSelected.due_date,
          important: taskOfIconSelected.important,
          completed: !taskOfIconSelected.completed
        }

        const updatedTask = await editTask(newCompletedStatus, id);

        const tasks = await listTasks();
        STORE.setTasks(tasks);

        DOMHandler.load(tasksPage(), document.querySelector("#root"));

      } catch (error) {
        console.log(error);
      }
    })

  })
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
      addNewTaskListener();
      importantTaskListener();
      completedTaskListener();
      // listenSubmitLogin();
      // listenCreateAccount();
      listenLogout();
    },
    state: {
      loginError: null,
    }
  }
}

export default tasksPage;
