import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";
import { ThemeToggle } from "../components/ThemeToggle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

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
  }
  return errors;
}

export function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const errors = validate(email, password);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSuccess(response: CredentialResponse) {
    setGoogleError(null);
    if (!response.credential) {
      setGoogleError("Google did not return a credential.");
      return;
    }
    try {
      await loginWithGoogle(response.credential);
      navigate("/app");
    } catch (err) {
      setGoogleError(err instanceof Error ? err.message : "Google sign-in failed");
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Log in to keep tracking your tasks.</p>

            <div className="mt-6 flex justify-center">
              {GOOGLE_CLIENT_ID ? (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setGoogleError("Google sign-in failed")}
                  width="304"
                />
              ) : (
                <button
                  type="button"
                  disabled
                  title="Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-400"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M21.35 11.1H12v2.95h5.35c-.25 1.4-1.65 4.1-5.35 4.1-3.2 0-5.8-2.65-5.8-5.9s2.6-5.9 5.8-5.9c1.8 0 3 .75 3.7 1.4l2.5-2.4C16.8 3.9 14.6 3 12 3 6.95 3 3 6.95 3 12s3.95 9 9 9c5.2 0 8.6-3.65 8.6-8.8 0-.6-.05-1.05-.25-1.1z"
                    />
                  </svg>
                  Continue with Google
                </button>
              )}
            </div>
            {googleError && (
              <p className="mt-2 text-center text-sm text-red-600">{googleError}</p>
            )}

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs font-medium uppercase text-gray-400 dark:text-gray-500">or sign in with email</span>
              <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
                Password
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
                {submitting ? "Logging in…" : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              No account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Register
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
