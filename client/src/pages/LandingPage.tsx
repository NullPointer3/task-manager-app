import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedStat } from "../components/AnimatedStat";
import { Logo } from "../components/Logo";

const FEATURES = [
  {
    title: "Plan in seconds",
    body: "Capture a task the moment it crosses your mind, then organize it later with status, due dates, and notes.",
    gradient: "from-blue-500 to-cyan-500",
    icon: "M13 2L3 14h7l-1 8 10-12h-7l1-8z",
  },
  {
    title: "Track what matters",
    body: "Move work through Todo, In Progress, and Done so you always know what's next.",
    gradient: "from-purple-500 to-pink-500",
    icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  },
  {
    title: "Built for one or a team",
    body: "Every account is fully isolated and secured — your tasks are only ever visible to you.",
    gradient: "from-emerald-500 to-teal-500",
    icon: "M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z",
  },
];

const LOGO_CLOUD = [
  "Northwind",
  "Initech",
  "Globex",
  "Umbrella Co.",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Acme Corp",
];

const STATS = [
  { target: 10, suffix: "k+", decimals: 0, label: "Tasks completed" },
  { target: 2500, suffix: "+", decimals: 0, label: "Active users" },
  { target: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { target: 4.9, suffix: "/5", decimals: 1, label: "Average rating" },
];

const STEPS = [
  {
    title: "Create an account",
    body: "Sign up in seconds with just an email and password. No credit card required.",
  },
  {
    title: "Add your tasks",
    body: "Jot down everything on your plate, then add due dates and notes whenever you're ready.",
  },
  {
    title: "Track your progress",
    body: "Move tasks across Todo, In Progress, and Done so you always know what's left.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Tasker replaced three different apps I was juggling. It's fast and it just gets out of the way.",
    name: "Maya Chen",
    role: "Product Designer",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote: "The simplicity is the whole point. I finally have one place where I track everything I need to do.",
    name: "Daniel Ortiz",
    role: "Freelance Developer",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    quote: "Clean, quick, and exactly as complicated as it needs to be — which is to say, not very.",
    name: "Priya Nair",
    role: "Operations Lead",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const STEP_GRADIENTS = ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-emerald-500 to-teal-500"];

const FAQS = [
  {
    question: "Is Tasker really free?",
    answer: "Yes. Creating an account and managing your tasks is free, with no credit card required.",
  },
  {
    question: "Can I use Tasker with my team?",
    answer: "Each account is currently single-user, with tasks fully isolated to the account that created them.",
  },
  {
    question: "Is my data secure?",
    answer: "Your tasks are private to your account and protected behind authenticated, per-user access.",
  },
  {
    question: "What happens if I forget my password?",
    answer: "You can reset your password from the login page at any time.",
  },
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 font-poppins">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white hover:from-blue-600 hover:to-indigo-600"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute left-6 right-6 top-full z-20 mt-2 flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg md:hidden">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-center text-sm font-medium text-white hover:from-blue-600 hover:to-indigo-600"
            >
              Sign up
            </Link>
          </div>
        )}
      </nav>

      <header className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden px-6 py-16 md:grid-cols-2 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-300 opacity-30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-purple-300 opacity-30 blur-3xl"
        />
        <div className="relative z-10">
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
              className="rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:from-blue-600 hover:to-indigo-600"
            >
              Get started free
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
            >
              Log in
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free forever. No credit card required.</p>
        </div>

        <div className="relative z-10 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-lg backdrop-blur-md">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="shrink-0 text-base font-semibold text-gray-900">Tasks</span>
            <span className="min-w-0 truncate text-sm text-gray-500">you@example.com</span>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4">
              <span className="min-w-0 flex-1 truncate text-base text-gray-900">Write quarterly report</span>
              <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-medium text-amber-700">
                In Progress
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4">
              <span className="min-w-0 flex-1 truncate text-base text-gray-900">Review pull requests</span>
              <span className="shrink-0 rounded-full bg-gray-200 px-2.5 py-1 text-sm font-medium text-gray-700">
                Todo
              </span>
            </li>
            <li className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white p-4 opacity-60">
              <span className="min-w-0 flex-1 truncate text-base text-gray-900 line-through">Plan team offsite</span>
              <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-700">
                Done
              </span>
            </li>
          </ul>
        </div>
      </header>

      <section className="border-y border-gray-200 bg-white py-10">
        <p className="text-center text-sm font-medium text-gray-500">Trusted by teams at</p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...LOGO_CLOUD, ...LOGO_CLOUD].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="whitespace-nowrap text-lg font-semibold text-gray-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gradient-to-r from-blue-50 via-gray-50 to-purple-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900 md:text-3xl">
                <AnimatedStat target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-sm"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} text-white`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <path
                    d={feature.icon}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${STEP_GRADIENTS[index % STEP_GRADIENTS.length]}`}
                >
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold text-gray-900">Loved by people who get things done</h2>
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${testimonial.gradient}`}
                >
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-10 flex flex-col gap-6">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 border-l-4 border-l-blue-500 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-white md:text-5xl">Ready to get organized?</h2>
              <p className="mt-4 text-lg text-blue-100">
                Create your free account and start tracking your tasks today.
              </p>
              <Link
                to="/register"
                className="mt-8 inline-block rounded-md bg-white px-8 py-4 text-base font-semibold hover:bg-blue-50"
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Get started free
                </span>
              </Link>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="shrink-0 text-base font-semibold text-white">Tasks</span>
                <span className="min-w-0 truncate text-sm text-blue-100">you@example.com</span>
              </div>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center justify-between gap-2 rounded-lg bg-white p-4">
                  <span className="min-w-0 flex-1 truncate text-base text-gray-900">Launch marketing site</span>
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-sm font-medium text-amber-700">
                    In Progress
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2 rounded-lg bg-white p-4">
                  <span className="min-w-0 flex-1 truncate text-base text-gray-900">Send onboarding email</span>
                  <span className="shrink-0 rounded-full bg-gray-200 px-2.5 py-1 text-sm font-medium text-gray-700">
                    Todo
                  </span>
                </li>
                <li className="flex items-center justify-between gap-2 rounded-lg bg-white p-4 opacity-60">
                  <span className="min-w-0 flex-1 truncate text-base text-gray-900 line-through">Set up workspace</span>
                  <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-700">
                    Done
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <Logo />
          <p className="text-sm text-gray-500">Tasker &mdash; a simple task manager.</p>
        </div>
      </footer>
    </div>
  );
}
