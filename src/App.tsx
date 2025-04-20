import { useEffect, useState } from "react";
import { TodoItem } from "./types/TodoItem";
import { loadTodos, saveTodos } from "./utils/storage";

const App = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const storedTodos = loadTodos();
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = () => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      status: "Not Started",
    };
    setTodos([...todos, newTodo]);
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: todo.status === "Completed" ? "Not Started" : "Completed",
            }
          : todo
      )
    );
  };

  const isFormValid = description.trim() !== "" && dueDate !== "";

  return (
    <div className="w-full max-w-md min-w-[350px] mx-auto p-6 bg-white shadow-md rounded-2xl m-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My ToDo List
      </h1>

      {/* Create ToDo */}
      <div className="flex flex-col gap-3">
        {/* Description Section */}
        <input
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-300 transition text-gray-900 placeholder-gray-500"
          placeholder="What do you need to do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Priority Section */}
        <div className="relative">
          <select
            className="border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-gray-900 appearance-none w-full"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "High" | "Medium" | "Low")
            }
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Date Section */}
        <input
          type="date"
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-300 transition text-gray-900 placeholder-gray-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Add Buttion Section */}
        <button
          className={`p-3 rounded-xl font-semibold mt-3 cursor-pointer transition ${
            isFormValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleAddTodo}
          disabled={!isFormValid}
        >
          Add ToDo
        </button>
      </div>

      {/* Show ToDo List */}
      {todos.length > 0 && (
        <ul className="flex flex-col gap-4 mt-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`border p-4 rounded-2xl shadow-sm transition bg-gray-50 ${
                todo.status === "Completed" ? "opacity-60" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p
                    className={`font-medium text-lg ${
                      todo.status === "Completed"
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Priority: {todo.priority}
                  </p>
                  {todo.dueDate && (
                    <p className="text-sm text-gray-400">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-xl text-sm font-semibold text-white transition ${
                      todo.status === "Completed"
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleToggleStatus(todo.id)}
                  >
                    {todo.status === "Completed" ? "Undo" : "Done"}
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded-xl text-sm font-semibold text-white"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
