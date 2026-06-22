import { Task, TaskStatus } from "../lib/api";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  return (
    <li className={`task-item task-item--${task.status.toLowerCase()}`}>
      <div className="task-item__main">
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-item__actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}
