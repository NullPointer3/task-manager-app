import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";

type Status = "verifying" | "success" | "error";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { markEmailVerified } = useAuth();
  const [status, setStatus] = useState<Status>("verifying");
  const [message, setMessage] = useState("");
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    if (!token) {
      setStatus("error");
      setMessage("This verification link is missing a token.");
      return;
    }

    api
      .verifyEmail(token)
      .then(() => {
        markEmailVerified();
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Verification failed");
      });
  }, [token, markEmailVerified]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 font-poppins">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-300 opacity-30 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-5">
        <Logo />
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <Reveal className="w-full max-w-sm">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 text-center shadow-lg backdrop-blur-md">
            {status === "verifying" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Verifying your email…</h1>
                <p className="mt-2 text-sm text-gray-600">Hang tight, this only takes a moment.</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                    <path
                      d="M5 12.5l4 4 10-10"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900">Email verified</h1>
                <p className="mt-2 text-sm text-gray-600">Your email address has been confirmed.</p>
                <Link
                  to="/app"
                  className="mt-6 inline-block w-full rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-2.5 text-center text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-600"
                >
                  Go to your tasks
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <h1 className="text-2xl font-bold text-gray-900">Verification failed</h1>
                <p className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {message}
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Log in and use the resend option, or{" "}
                  <Link to="/register" className="font-medium text-blue-600 hover:underline">
                    create a new account
                  </Link>
                  .
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-block w-full rounded-md border border-gray-300 px-3 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Back to log in
                </Link>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
