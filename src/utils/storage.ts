import { TodoItem } from "../types/TodoItem";

export const loadTodos = (): TodoItem[] => {
  const todosJson = localStorage.getItem("todoItems");
  return todosJson ? JSON.parse(todosJson) : [];
};

export const saveTodos = (todos: TodoItem[]) => {
  localStorage.setItem("todoItems", JSON.stringify(todos));
};
