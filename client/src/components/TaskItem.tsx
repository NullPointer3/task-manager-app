import { Task, TaskStatus } from "../lib/api";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 ${
        task.status === "DONE" ? "opacity-60" : ""
      }`}
    >
      <div className="min-w-0">
        <strong className={`block text-sm text-gray-900 ${task.status === "DONE" ? "line-through" : ""}`}>
          {task.title}
        </strong>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md border border-red-200 px-2 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
