import { TodoItem } from "../types/TodoItem";

export const loadTodos = (): TodoItem[] => {
  const todosJson = localStorage.getItem("todoItems");
  if (!todosJson) return [];

  const rawTodos = JSON.parse(todosJson);

  return rawTodos.map((todo: TodoItem) => ({
    ...todo,
    dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
  }));
};

export const saveTodos = (todos: TodoItem[]) => {
  localStorage.setItem("todoItems", JSON.stringify(todos));
};
