import { input } from "../components/input.js"
import { logout } from "../services/sessions-service.js";
import loginPage from "./login-page.js";
import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import { saveToLocalStorage } from "../utils.js";
import { listTasks, getTask, createTask, editTask, importantTask, completedTask, deleteTask } from "../services/tasks-service.js";

let sortFilter;
// let showFilter;

const sortByAlphabet = function (a, b){
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

const sortByDate = function (a, b) {
  return new Date(a.due_date) - new Date(b.due_date)
}

const sortByImportance = function(a,b){
    if(a.completed == true) return 1;
    else if(b.important == true) return 0;
    else return -1;
}

// function onlyPending(tasks){
//   const pendingTasks = tasks.filter((task) => task.completed !== true);
//   return pendingTasks;
// }

// function onlyImportant(tasks) {
//   const importantTasks = tasks.filter((task) => task.important == true);
//   return importantTasks;
// }

function renderTask(task) {
  console.log("inside render task!!!");

  return `
    <div class="task js-task flex" data-id="${task.id}">
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

  let tasksList = STORE.tasks;

  if (sortFilter != "") {
    tasksList = tasksList.sort(sortFilter);
    STORE.setTasks(tasksList);
   }

  // if (showFilter != "") tasksList = showFilter((task)=> );
  // // if (showFilter != "") console.log(showFilter);
  // // console.log("here show Filter", showFilter);
  console.log(tasksList);

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

            <select class="form-select" aria-label="Default select example" name="sort-filter" id="sort-filter">
                <option disabled selected hidden>Select an option</option>
                <option value="Alphabetical (a-z)" id="sort-option"
                ${STORE.currentSortFilter === "Alphabetical (a-z)" ? "selected" : ""}
                >Alphabetical (a-z)</option>
                <option value="Due date" id="sort-option"
                ${STORE.currentSortFilter === "Due date" ? "selected" : ""}
                >Due date</option>
                <option value="Importance" id="sort-option"
                ${STORE.currentSortFilter === "Importance" ? "selected" : ""}
                >Importance</option>
            </select>
           </div>


           <div class="checkboxes-container flex">
           <label class="content-xs overline"> Show </label>

           <label class="content-xs overline js-pending-filter flex" id="">
            <input type="radio" class="show-filter" value="pending" name="show-filter" id="completed" />Only pending</label>
           <label class="content-xs overline js-important-filter flex" id="">
            <input type="radio" class="show-filter" value="important" name="show-filter" id="important" />Only important</label>
           </div>

           <div class="task-list js-tasks-container">
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
            // value: "dd/mm/aaaa",
          })}

          <button class="button button--primary"> Add Task </button>
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

function sortByFilterListener() {
  console.log("showByFilterListener from Tasks Page");

  let selectedOption;
  document.getElementById('sort-filter').addEventListener('change', function() {
    selectedOption = this.value;

    try {
      if (selectedOption == "Alphabetical (a-z)") sortFilter = sortByAlphabet;

      if (selectedOption == "Due date") sortFilter = sortByDate;

      if (selectedOption == "Importance") sortFilter = sortByImportance;
    } catch (error) {
      console.log(error);
    }

    if (sortFilter != "") STORE.setCurrentSortFilter(selectedOption)
    DOMHandler.reload();
  }, false);
}

// let option;
function showOnlyFilterListener() {
  console.log("showOnlyFilterListener from Tasks Page");


  const inputs = document.querySelectorAll(".show-filter");

  // inputs.forEach((input)=> {
  //   input.addEventListener("change", async (event) => {
  //     event.preventDefault();


  //     // option = event.target.value;

  //     try {
  //       console.log(event.target);
  //       console.log(event.target.checked);
  //       console.log(event.target.value);

  //       if (event.target.value == "pending") showFilter = onlyPending;
  //       if (event.target.value == "important") showFilter = onlyImportant;

  //     } catch (error) {
  //       console.log(error);
  //     }

  //     // if (sortFilter != "") STORE.setCurrentSortFilter(selectedOption)
  //     DOMHandler.reload();
  //   })

  // })

}

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async(event) => {
    event.preventDefault();

    try {
      await logout();
      STORE.setCurrentSortFilter("");
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
      sortByFilterListener();
      showOnlyFilterListener();
      listenLogout();
    },
    state: {
      loginError: null,
    }
  }
}

export default tasksPage;
