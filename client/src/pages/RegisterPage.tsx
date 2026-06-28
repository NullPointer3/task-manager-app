import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";
import { ThemeToggle } from "../components/ThemeToggle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  return errors;
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const errors = validate(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await register(email.trim(), password);
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 font-poppins dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-300 opacity-30 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/"
            aria-label="Cancel and go back"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/70 text-gray-700 backdrop-blur-md hover:bg-white dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <Reveal className="w-full max-w-sm">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-lg backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create your account</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Start organizing your tasks in seconds.</p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setFieldErrors((prev) => ({ ...prev, ...validate(email, password) }))}
                  className={`rounded-md border bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 ${
                    fieldErrors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100 dark:border-red-700"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100 dark:border-gray-600 dark:focus:border-blue-400"
                  }`}
                />
                {fieldErrors.email && <span className="text-xs text-red-600 dark:text-red-400">{fieldErrors.email}</span>}
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Password (min 8 characters)
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setFieldErrors((prev) => ({ ...prev, ...validate(email, password) }))}
                  className={`rounded-md border bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-100 ${
                    fieldErrors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100 dark:border-red-700"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-100 dark:border-gray-600 dark:focus:border-blue-400"
                  }`}
                />
                {fieldErrors.password && <span className="text-xs text-red-600 dark:text-red-400">{fieldErrors.password}</span>}
              </label>
              {error && (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Log in
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
