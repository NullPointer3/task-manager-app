import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Plan in seconds",
    body: "Capture a task the moment it crosses your mind, then organize it later with status, due dates, and notes.",
  },
  {
    title: "Track what matters",
    body: "Move work through Todo, In Progress, and Done so you always know what's next.",
  },
  {
    title: "Built for one or a team",
    body: "Every account is fully isolated and secured — your tasks are only ever visible to you.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-lg font-semibold text-gray-900">Tasker</span>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Build your day's foundation with tasks
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Plan, organize, and track everything you need to get done &mdash; in one simple, fast task
            manager.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get started free
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Log in
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free forever. No credit card required.</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Tasks</span>
            <span className="text-xs text-gray-500">you@example.com</span>
          </div>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
              <span className="text-sm text-gray-900">Write quarterly report</span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                In Progress
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
              <span className="text-sm text-gray-900">Review pull requests</span>
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">
                Todo
              </span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 opacity-60">
              <span className="text-sm text-gray-900 line-through">Plan team offsite</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                Done
              </span>
            </li>
          </ul>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        Tasker &mdash; a simple task manager.
      </footer>
    </div>
  );
}
