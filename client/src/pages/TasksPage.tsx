import { useEffect, useState } from "react";
import { api, Task, TaskStatus } from "../lib/api";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { useAuth } from "../context/AuthContext";

export function TasksPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getTasks()
      .then(setTasks)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load tasks"))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data: { title: string; description?: string }) {
    const task = await api.createTask(data);
    setTasks((prev) => [task, ...prev]);
  }

  async function handleStatusChange(id: string, status: TaskStatus) {
    const task = await api.updateTask(id, { status });
    setTasks((prev) => prev.map((t) => (t.id === id ? task : t)));
  }

  async function handleDelete(id: string) {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="tasks-page">
      <header>
        <h1>Tasks</h1>
        <div>
          <span>{user?.email}</span>
          <button onClick={logout}>Log out</button>
        </div>
      </header>

      <TaskForm onSubmit={handleCreate} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        ))}
      </ul>
      {!loading && tasks.length === 0 && <p>No tasks yet — add one above.</p>}
    </div>
  );
}
