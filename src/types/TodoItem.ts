export interface TodoItem {
  id: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  dueDate?: Date;
  status: "Not Started" | "In Progress" | "Completed";
}
