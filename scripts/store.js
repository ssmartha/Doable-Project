import { saveToLocalStorage, fromLocalStorage } from "./utils.js";

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  user: null,
  tasks: [],
  setUser(user) {
    this.user = user;
    saveToLocalStorage("user",user);
  },
  setCurrentPage(page) {
    this.currentPage = page;
    saveToLocalStorage("current-page", page);
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
}

export default STORE;