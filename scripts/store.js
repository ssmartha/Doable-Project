import { saveToLocalStorage, fromLocalStorage } from "./utils.js";
import { listTasks } from "./services/tasks-service.js"

// async function fetchTasks() {
//   const tasks = await listTasks();
//   console.log(tasks);
//   this.setTasks(tasks);
//   console.log(this);
// }

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  currentSortFilter: fromLocalStorage("current-sort-filter") || "",
  user: null,
  tasks: fromLocalStorage("tasks") || [],
  setUser(user) {
    this.user = user;
    saveToLocalStorage("user",user);
  },
  setCurrentPage(page) {
    this.currentPage = page;
    saveToLocalStorage("current-page", page);
  },
  setCurrentSortFilter(filter) {
    this.currentSortFilter = filter;
    saveToLocalStorage("current-sort-filter", filter);
  },
  setCurrentShowFilter(filter) {
    this.currentShowFilter = filter;
    saveToLocalStorage("current-sort-filter", filter);
  },
  setTasks(tasks) {
    this.tasks = tasks;
    saveToLocalStorage("tasks",tasks);
  },
  addTask(task) {
    const tasks = this.tasks;
    tasks.push(task);
    saveToLocalStorage("tasks",tasks);
  },
  deleteCard(taskId) {
    const tasks = this.tasks;
    const newTasks = tasks.filter((task) => task.id !== taskId);
    tasks = newTasks;
    saveToLocalStorage("tasks",tasks);
  },
  // fetchTasks,
}

export default STORE;
