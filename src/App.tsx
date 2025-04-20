import { useEffect, useState } from "react";
import { TodoItem } from "./types/TodoItem";
import { loadTodos, saveTodos } from "./utils/storage";

const App = () => {
  // * STATES *
  const [todos, setTodos] = useState<TodoItem[]>(() => loadTodos());
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  // * EFFECTS *
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // * HANDLERS *
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

  // * COMPUTED *
  const isFormValid = description.trim() !== "" && dueDate !== "";

  // * DOM *
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
        <div className="relative cursor-pointer">
          <select
            className="border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-gray-900 appearance-none w-full cursor-pointer"
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
        <div className="relative w-full">
          <input
            type="date"
            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            className={`appearance-none w-full border border-gray-300 p-3 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-300 transition placeholder-gray-500 cursor-pointer
              [&::-webkit-calendar-picker-indicator]:opacity-0
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
              ${
                dueDate === ""
                  ? "[&::-webkit-datetime-edit]:text-gray-500"
                  : "text-gray-900"
              }
            `}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

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
              className={`relative border p-4 rounded-2xl shadow-sm transition bg-gray-50 ${
                todo.status === "Completed" ? "opacity-60" : ""
              }`}
            >
              {/* Edit Button */}
              <button
                className="absolute top-4 right-12 text-gray-400 hover:text-blue-500 transition cursor-pointer"
                onClick={() => setEditingTodo(todo)}
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                  />
                </svg>
              </button>

              {/* Delete Button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition cursor-pointer"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col gap-2">
                {/* Description Section */}
                <p
                  className={`font-bold text-lg ${
                    todo.status === "Completed"
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.description}
                </p>

                {/* Priority Section */}
                <p
                  className={`text-sm font-medium ${
                    todo.priority === "High"
                      ? "text-red-500"
                      : todo.priority === "Medium"
                      ? "text-yellow-500"
                      : "text-gray-500"
                  }`}
                >
                  Priority: {todo.priority}
                </p>

                {/* Date Section */}
                {todo.dueDate && (
                  <p className="text-sm text-gray-500">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}

                {/* Status Section */}
                <p
                  className={`text-sm ${
                    todo.status === "Not Started"
                      ? "text-gray-400"
                      : todo.status === "In Progress"
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  Status: {todo.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Todo Modal */}
      {editingTodo && (
        <div className="fixed inset-0 z-50 bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
            <p className="text-gray-700">Modal</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setEditingTodo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
