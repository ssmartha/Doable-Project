import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export const listTasks = () => {
	return apiFetch("/tasks");
};

export const getTask = ( id ) => {
	return apiFetch(`tasks/${id}`);
};

export async function createTask(
  newTask = { title, due_date , important:false , completed:false }
) {
  	return await apiFetch("tasks", { body: newTask });
}

export async function editTask(newBody = { title, due_date, important, completed }, id) {
  return await apiFetch (`tasks/${id}`,{ method: "PATCH", body: newBody});
}

export async function importantTask(newBody = { important }, id) {
	return await apiFetch (`tasks/${id}`,{ method: "PATCH", body: newBody});
}

export async function completedTask(newBody = { completed }, id) {
	return await apiFetch (`tasks/${id}`,{ method: "PATCH", body: newBody});
}

export async function deleteTask(id) {
  return await apiFetch(`contacts/${id}`, { method: "DELETE" });
}
