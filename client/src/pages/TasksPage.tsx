import { useEffect, useState } from "react";
import { api, Task, TaskStatus } from "../lib/api";
import { TaskForm } from "../components/TaskForm";
import { TaskItem } from "../components/TaskItem";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export function TasksPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  async function handleResendVerification() {
    setResendState("sending");
    try {
      await api.resendVerification();
      setResendState("sent");
    } catch {
      setResendState("idle");
    }
  }

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
    <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-white p-6 shadow dark:bg-gray-900 dark:shadow-gray-900">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Tasks</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</span>
          <ThemeToggle />
          <button
            onClick={logout}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Log out
          </button>
        </div>
      </header>

      {user && !user.emailVerified && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <span>
            {resendState === "sent"
              ? "Verification email sent — check your inbox."
              : "Please verify your email address."}
          </span>
          {resendState !== "sent" && (
            <button
              onClick={handleResendVerification}
              disabled={resendState === "sending"}
              className="rounded-md border border-amber-300 px-3 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900"
            >
              {resendState === "sending" ? "Sending…" : "Resend email"}
            </button>
          )}
        </div>
      )}

      <TaskForm onSubmit={handleCreate} />

      {loading && <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />
        ))}
      </ul>
      {!loading && tasks.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">No tasks yet — add one above.</p>
      )}
    </div>
  );
}
