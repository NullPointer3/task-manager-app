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
    <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-white p-6 shadow">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={logout}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Log out
          </button>
        </div>
      </header>

      <TaskForm onSubmit={handleCreate} />

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        ))}
      </ul>
      {!loading && tasks.length === 0 && (
        <p className="text-sm text-gray-500">No tasks yet — add one above.</p>
      )}
    </div>
  );
}
